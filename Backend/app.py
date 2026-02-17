from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import numpy as np

# ---------- Paths ----------
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "backend_model", "diabetes_rf.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "backend_model", "scaler.pkl")

# ---------- Load Model ----------
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# ---------- FastAPI ----------
app = FastAPI(title="Diabetes Prediction API")

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Input Schema ----------
class DiabetesInput(BaseModel):
    Pregnancies: float
    Glucose: float
    Bp: float
    Skin: float
    Insulin: float
    Bmi: float
    Dpf: float
    Age: float


# ---------- Prediction API ----------
@app.post("/predict")
def predict(data: DiabetesInput):

    values = np.array([[
        data.Pregnancies,
        data.Glucose,
        data.Bp,
        data.Skin,
        data.Insulin,
        data.Bmi,
        data.Dpf,
        data.Age
    ]])

    values = scaler.transform(values)

    prediction = model.predict(values)[0]
    probability = model.predict_proba(values)[0][1]

    return {
        "prediction": int(prediction),
        "probability": float(probability)
    }
