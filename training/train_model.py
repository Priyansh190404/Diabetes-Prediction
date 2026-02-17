import pandas as pd
import os
import joblib

from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# ---------- Load Dataset ----------
BASE_DIR = os.path.dirname(__file__)
DATA_PATH = os.path.join(BASE_DIR, "diabetes.csv")

df = pd.read_csv(DATA_PATH)

# ---------- Split Features ----------
X = df.drop("Outcome", axis=1)
y = df["Outcome"]

# ---------- Train Test Split ----------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ---------- Create Pipeline ----------
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", RandomForestClassifier())
])

# ---------- Train ----------
pipeline.fit(X_train, y_train)

# ---------- Save Pipeline ----------
backend_path = os.path.join(BASE_DIR, "../Backend/backend_model")
os.makedirs(backend_path, exist_ok=True)

joblib.dump(pipeline, os.path.join(backend_path, "diabetes_pipeline.pkl"))

print("✅ Pipeline trained and saved successfully!")
