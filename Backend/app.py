from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os

# Paths
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "backend_model", "diabetes_rf.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "backend_model", "scaler.pkl")

# Load model and scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# FastAPI app
app = FastAPI(title="Diabetes Prediction API")

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend origin
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input validation
class DiabetesInput(BaseModel):
    pregnancies: int
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    diabetes_pedigree_function: float
    age: int

@app.post("/predict")
async def predict_diabetes(data: DiabetesInput):
    try:
        # Convert input to list and scale
        values = [[
            data.pregnancies,
            data.glucose,
            data.blood_pressure,
            data.skin_thickness,
            data.insulin,
            data.bmi,
            data.diabetes_pedigree_function,
            data.age
        ]]
        scaled = scaler.transform(values)
        prediction = model.predict(scaled)[0]
        return {"prediction": int(prediction)}
    except Exception as e:
        return {"error": str(e)}
