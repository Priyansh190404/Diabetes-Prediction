from fastapi import FastAPI
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ ADD THIS (CORS FIX)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = "AIzaSyArmbmZxNINa35lniVMxHbch2xOyOtXFF8"

class Query(BaseModel):
    message: str

@app.post("/chat")
def chat(q: Query):
    try:
        url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={API_KEY}"

        system_prompt = (
            "You are a specialized Diabetes Health Assistant. "
            "You ONLY answer questions related to diabetes — including symptoms, "
            "prevention, diet, blood sugar levels, medication, lifestyle changes, "
            "risk factors, and related health metrics like BMI, glucose, and blood pressure. "
            "If the user asks about anything unrelated to diabetes or general health, "
            "politely decline and remind them that you can only help with diabetes-related topics. "
            "Keep answers concise, clear, and easy to understand for a general audience."
        )

        body = {
            "system_instruction": {
                "parts": [{"text": system_prompt}]
            },
            "contents": [
                {
                    "parts": [{"text": q.message}]
                }
            ]
        }

        response = requests.post(url, json=body)

        return response.json()

    except Exception as e:
        return {"error": str(e)}