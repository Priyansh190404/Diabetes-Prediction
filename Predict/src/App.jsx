import { useState } from "react";
import diabetesBg from "./assets/diabetes.png";

const fields = [
  { name: "Pregnancies", label: "Pregnancies", min: 0, max: 20 },
  { name: "Glucose", label: "Glucose (mg/dL)", min: 50, max: 300 },
  { name: "BloodPressure", label: "Blood Pressure (mm Hg)", min: 30, max: 200 },
  { name: "SkinThickness", label: "Skin Thickness (mm)", min: 0, max: 100 },
  { name: "Insulin", label: "Insulin (µU/mL)", min: 0, max: 900 },
  { name: "BMI", label: "BMI", min: 10, max: 70 },
  {
    name: "DiabetesPedigreeFunction",
    label: "Diabetes Pedigree Function",
    min: 0.05,
    max: 3,
  },
  { name: "Age", label: "Age (years)", min: 1, max: 120 },
];

function App() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (value, min, max) => {
    if (value === "" || isNaN(value)) return "Required";
    if (value < min || value > max)
      return `Must be between ${min} and ${max}`;
    return "";
  };

  const handleChange = (e, field) => {
    const value = Number(e.target.value);
    setData({ ...data, [field.name]: value });
    setErrors({
      ...errors,
      [field.name]: validate(value, field.min, field.max),
    });
  };

  const hasErrors =
    Object.values(errors).some(Boolean) ||
    fields.some((f) => data[f.name] === undefined);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6 relative"
      style={{
        backgroundImage: `url(${diabetesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* SOFT WHITE OVERLAY (NOT TOO STRONG) */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* MAIN CARD */}
      <div className="relative max-w-4xl w-full bg-white/75 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          🩺 Diabetes Risk Prediction
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter clinically valid health values
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type="number"
                onChange={(e) => handleChange(e, field)}
                className={`w-full mt-1 px-4 py-2 rounded-xl border ${
                  errors[field.name]
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-blue-400 outline-none`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  ⚠️ {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <button
            disabled={hasErrors}
            className={`col-span-full mt-6 py-3 rounded-xl font-semibold text-white
              ${
                hasErrors
                  ? "bg-gray-400 cursor-not-allowed"
                  : " from-blue-600 to-teal-500 hover:opacity-90"
              }`}
          >
            🔍 Predict with Random Forest
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          ⚠️ This tool is for educational purposes only.
        </p>
      </div>
    </div>
  );
}

export default App;
