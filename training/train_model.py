# import pandas as pd
# import os
# import joblib

# from sklearn.pipeline import Pipeline
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import StandardScaler
# from sklearn.model_selection import train_test_split

# # ---------- Load Dataset ----------
# BASE_DIR = os.path.dirname(__file__)
# DATA_PATH = os.path.join(BASE_DIR, "diabetes.csv")

# df = pd.read_csv(DATA_PATH)

# # ---------- Split Features ----------
# X = df.drop("Outcome", axis=1)
# y = df["Outcome"]

# # ---------- Train Test Split ----------
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42
# )

# # ---------- Create Pipeline ----------
# pipeline = Pipeline([
#     ("scaler", StandardScaler()),
#     ("model", RandomForestClassifier())
# ])

# # ---------- Train ----------
# pipeline.fit(X_train, y_train)

# # ---------- Save Pipeline ----------
# backend_path = os.path.join(BASE_DIR, "../Backend/backend_model")
# os.makedirs(backend_path, exist_ok=True)

# joblib.dump(pipeline, os.path.join(backend_path, "diabetes_pipeline.pkl"))

# print("✅ Pipeline trained and saved successfully!")

import pandas as pd
import os
import joblib
import json

from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

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

# ---------- Models ----------
models = {
    "Random Forest": RandomForestClassifier(),
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "SVM": SVC(probability=True)
}

results = {}
best_pipeline = None
best_score = 0

# ---------- Train & Compare ----------
for name, model in models.items():

    pipeline = Pipeline([
        ("scaler", StandardScaler()),
        ("model", model)
    ])

    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)

    results[name] = {
        "accuracy": acc,
        "precision": prec,
        "recall": rec,
        "f1_score": f1
    }

    print(f"{name} Accuracy: {acc:.4f}")

    # Select best model
    if acc > best_score:
        best_score = acc
        best_pipeline = pipeline

# ---------- Save Paths ----------
backend_path = os.path.join(BASE_DIR, "../Backend/backend_model")
os.makedirs(backend_path, exist_ok=True)

# Save best pipeline
joblib.dump(best_pipeline, os.path.join(backend_path, "best_model.pkl"))

# Save comparison results
with open(os.path.join(backend_path, "comparison.json"), "w") as f:
    json.dump(results, f, indent=4)

print("\n✅ Best model saved as best_model.pkl")
print("✅ Comparison saved as comparison.json")