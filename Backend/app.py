from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import numpy as np
import shap
import requests
import json

# ---------- Paths ----------
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "backend_model", "diabetes_rf.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "backend_model", "scaler.pkl")

# ---------- Load ----------
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# Correct explainer
explainer = shap.TreeExplainer(model)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://diabetes-prediction-ps-32fc.vercel.app",
        "https://diabetes-prediction-ksprgz79e-ps-32fc.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

GEMINI_URL = (
    "https://generativelanguage.googleapis.com/"
    "v1beta/models/gemini-2.0-flash:generateContent"
)

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

        body = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        }

        response = requests.post(
            f"{GEMINI_URL}?key={GEMINI_API_KEY}",
            json=body,
            timeout=15
        )

        # Temporary debugging logs for Render
        print("GEMINI STATUS:", response.status_code)
        print("GEMINI RESPONSE:", response.text)

        # Raise an exception for HTTP errors such as 400, 401, 403, 404, 429, 500
        response.raise_for_status()

        data = response.json()

        text = (
            data.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
        )

        return {
            "reply": text or "I could not generate a response. Please try again."
        }

    except Exception as e:
        print("GEMINI ERROR:", repr(e))
        return {
            "reply": f"Backend error: {str(e)}"
        }


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
        data.Pregnancies,
        data.Glucose,
        data.Bp,
        data.Skin,
        data.Insulin,
        data.Bmi,
        data.Dpf,
        data.Age
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
        shap_array = raw_shap[1]
    else:
        shap_array = raw_shap

    # Flatten to 1D array safely
    if hasattr(shap_array, "shape"):
        if len(shap_array.shape) == 2:
            shap_vals = shap_array[0]
        elif len(shap_array.shape) == 1:
            shap_vals = shap_array
        else:
            shap_vals = np.array(shap_array).flatten()
    else:
        shap_vals = np.array(shap_array).flatten()

    # Convert every impact to a pure Python float
    feature_names = [
        "Pregnancies",
        "Glucose",
        "BloodPressure",
        "SkinThickness",
        "Insulin",
        "BMI",
        "DPF",
        "Age"
    ]

    explanation = []

    for i in range(len(feature_names)):
        impact = shap_vals[i]

        if isinstance(impact, (np.ndarray, np.generic)):
            impact = np.asarray(impact).item()
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


@app.get("/comparison")
def get_comparison():
    comparison_path = os.path.join(
        BASE_DIR,
        "backend_model",
        "comparison.json"
    )

    fallback = {
        "Logistic Regression": {
            "accuracy": 0.7725,
            "precision": 0.76,
            "recall": 0.76,
            "f1_score": 0.75
        },
        "XGBoost": {
            "accuracy": 0.9043,
            "precision": 0.90,
            "recall": 0.90,
            "f1_score": 0.90
        },
        "Random Forest": {
            "accuracy": 0.9819,
            "precision": 0.98,
            "recall": 0.96,
            "f1_score": 0.97
        },
        "SVM (Linear)": {
            "accuracy": 0.7851,
            "precision": 0.74,
            "recall": 0.58,
            "f1_score": 0.65
        }
    }

    try:
        with open(comparison_path, "r") as f:
            models = json.load(f)
    except Exception:
        models = fallback

    best_model = max(
        models,
        key=lambda m: models[m]["accuracy"]
    )

    return {
        "models": models,
        "best_model": best_model
    }

