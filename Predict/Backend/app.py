from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import numpy as np
import shap
import requests

# ---------- Paths ----------
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "backend_model", "diabetes_rf.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "backend_model", "scaler.pkl")

# ---------- Load ----------
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# ✅ Correct explainer
explainer = shap.TreeExplainer(model)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = "AIzaSyArmbmZxNINa35lniVMxHbch2xOyOtXFF8"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

DIABETES_SYSTEM_PROMPT = (
    "You are a specialized Diabetes Health Assistant. "
    "You ONLY answer questions related to diabetes — including symptoms, prevention, diet, "
    "blood sugar levels, medication, lifestyle changes, risk factors, and related health metrics "
    "like BMI, glucose, and blood pressure. "
    "If the user asks about anything unrelated to diabetes, politely decline and remind them "
    "you can only help with diabetes-related topics. "
    "Keep answers concise, clear, and easy to understand. "
    "Do not use markdown formatting symbols."
)

class ChatQuery(BaseModel):
    message: str

@app.post("/chat")
def chat(q: ChatQuery):
    try:
        prompt = f"{DIABETES_SYSTEM_PROMPT}\n\nUser question: {q.message}"
        body = {"contents": [{"parts": [{"text": prompt}]}]}
        response = requests.post(GEMINI_URL, json=body, timeout=15)
        data = response.json()
        text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        return {"reply": text or "I could not generate a response. Please try again."}
    except Exception as e:
        return {"reply": f"Backend error: {str(e)}"}

class DiabetesInput(BaseModel):
    Pregnancies: float
    Glucose: float
    Bp: float
    Skin: float
    Insulin: float
    Bmi: float
    Dpf: float
    Age: float

@app.post("/predict")
def predict(data: DiabetesInput):

    # Original input
    input_data = np.array([[ 
        data.Pregnancies, data.Glucose, data.Bp, data.Skin,
        data.Insulin, data.Bmi, data.Dpf, data.Age
    ]], dtype=float)

    scaled_data = scaler.transform(input_data)

    # Model output
    prediction = model.predict(scaled_data)[0]
    proba = model.predict_proba(scaled_data)[0]
    probability = float(proba[1])

    # ================== MOST ROBUST SHAP HANDLING ==================
    raw_shap = explainer.shap_values(scaled_data)

    # Extract SHAP values for the positive class (diabetes = class 1)
    if isinstance(raw_shap, list) and len(raw_shap) > 1:
        shap_array = raw_shap[1]          # positive class
    else:
        shap_array = raw_shap

    # Flatten to 1D array safely
    if hasattr(shap_array, 'shape'):
        if len(shap_array.shape) == 2:           # shape (1, 8)
            shap_vals = shap_array[0]
        elif len(shap_array.shape) == 1:         # already (8,)
            shap_vals = shap_array
        else:
            shap_vals = np.array(shap_array).flatten()
    else:
        shap_vals = np.array(shap_array).flatten()

    # Now safely convert every impact to pure Python float
    feature_names = [
        "Pregnancies", "Glucose", "BloodPressure",
        "SkinThickness", "Insulin", "BMI", "DPF", "Age"
    ]

    explanation = []
    for i in range(len(feature_names)):
        impact = shap_vals[i]

        # Ultra-safe conversion
        if isinstance(impact, (np.ndarray, np.generic)):
            impact = np.asarray(impact).item()   # works for shape (1,) and 0-d
        else:
            impact = float(impact)

        explanation.append({
            "feature": feature_names[i],
            "value": float(input_data[0][i]),
            "impact": impact
        })

    return {
        "prediction": int(prediction),
        "probability": round(probability, 4),
        "explanation": explanation
    }