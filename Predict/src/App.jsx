import { useState } from "react";
import diabetesBg from "./assets/diabetes.png";
import PreventivePage from "./components/Preventive/PreventivePage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Chatbot from "./components/Preventive/Chatbot.jsx";
import FieldsGuide from "./components/FieldsGuide.jsx";

/* ---------------- Fields Config ---------------- */
const fields = [
  { name: "Pregnancies", label: "Pregnancies", min: 0, max: 20 },
  { name: "Glucose", label: "Glucose", min: 50, max: 300 },
  { name: "BloodPressure", label: "Blood Pressure", min: 40, max: 130 },
  { name: "SkinThickness", label: "Skin Thickness", min: 5, max: 60 },
  { name: "Insulin", label: "Insulin", min: 0, max: 300 },
  { name: "BMI", label: "BMI", min: 15, max: 60 },
  { name: "DiabetesPedigreeFunction", label: "DPF", min: 0, max: 3 },
  { name: "Age", label: "Age", min: 1, max: 120 },
];

const mapAnswers = (ans) => ({
  Pregnancies: 0,
  Glucose: ans.thirst === "Yes" ? 170 : 110,
  BloodPressure: ans.overweight === "Yes" ? 140 : 80,
  SkinThickness: ans.overweight === "Yes" ? 35 : 20,
  Insulin: ans.thirst === "Yes" ? 200 : 80,
  BMI: ans.overweight === "Yes" ? 35 : 22,
  DiabetesPedigreeFunction: ans.family === "Yes" ? 1.5 : 0.4,
  Age: ans.age === "Above 50" ? 60 : ans.age === "30-50" ? 40 : 25,
});

function PredictionPage() {

  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
  const [explanation, setExplanation] = useState([]); // ✅ FIX 1
  const [loading, setLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState("low");

  const [simpleMode, setSimpleMode] = useState(false);

  const [simpleAnswers, setSimpleAnswers] = useState({
    family: "No",
    overweight: "No",
    thirst: "No",
    urination: "No",
    age: "Below 30",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalData = simpleMode ? mapAnswers(simpleAnswers) : data;

      const payload = {
        Pregnancies: Number(finalData.Pregnancies || 0),
        Glucose: Number(finalData.Glucose || 120),
        Bp: Number(finalData.BloodPressure || 70),
        Skin: Number(finalData.SkinThickness || 20),
        Insulin: Number(finalData.Insulin || 80),
        Bmi: Number(finalData.BMI || 25),
        Dpf: Number(finalData.DiabetesPedigreeFunction || 0.5),
        Age: Number(finalData.Age || 30),
      };

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      setPrediction(result.prediction);
      setProbability(result.probability);
      setExplanation(result.explanation || []); // ✅ FIX 2

      let risk = "Low";
      if (result.probability >= 0.7) risk = "High";
      else if (result.probability >= 0.4) risk = "Medium";

      setRiskLevel(risk.toLowerCase());
      localStorage.setItem("riskLevel", risk.toLowerCase());

    } catch (err) {
      alert("Backend not running");
    } finally {
      setLoading(false);
    }
  };

  const goToPreventive = () => {
    localStorage.setItem("riskLevel", riskLevel);
    navigate("/preventive");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6 relative"
      style={{ backgroundImage: `url(${diabetesBg})` }}
    >
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="relative max-w-4xl w-full bg-white/75 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-blue-700">
            Diabetes Risk Prediction
          </h1>
          <FieldsGuide />
        </div>
        <div className="flex justify-center mb-4 gap-4">
  <button
    onClick={() => setSimpleMode(false)}
    className={`px-4 py-2 rounded-lg ${
      !simpleMode ? "bg-blue-600 text-white" : "bg-gray-200"
    }`}
  >
    Advanced
  </button>

  <button
    onClick={() => setSimpleMode(true)}
    className={`px-4 py-2 rounded-lg ${
      simpleMode ? "bg-blue-600 text-white" : "bg-gray-200"
    }`}
  >
    Simple
  </button>
</div>
<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

  {/* ✅ SIMPLE MODE */}
  {simpleMode ? (
    <>
      {[
        { key: "family", label: "Family History?" },
        { key: "overweight", label: "Overweight?" },
        { key: "thirst", label: "Excessive Thirst?" },
        { key: "urination", label: "Frequent Urination?" },
      ].map((q, i) => (
        <div key={i} className="flex flex-col col-span-2">
          <label className="text-sm font-medium text-gray-700">
            {q.label}
          </label>

          <select
            className="p-2 border rounded-lg mt-1"
            value={simpleAnswers[q.key]}
            onChange={(e) =>
              setSimpleAnswers({
                ...simpleAnswers,
                [q.key]: e.target.value,
              })
            }
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      ))}

      {/* Age */}
      <div className="flex flex-col col-span-2">
        <label className="text-sm font-medium text-gray-700">
          Age Group
        </label>

        <select
          className="p-2 border rounded-lg mt-1"
          value={simpleAnswers.age}
          onChange={(e) =>
            setSimpleAnswers({
              ...simpleAnswers,
              age: e.target.value,
            })
          }
        >
          <option>Below 30</option>
          <option>30-50</option>
          <option>Above 50</option>
        </select>
      </div>
    </>
  ) : (
    /* ✅ ADVANCED MODE (your existing inputs) */
    fields.map((field, index) => (
      <div key={index} className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {field.label}
        </label>

        <input
          type="number"
          min={field.min}
          max={field.max}
          placeholder={field.label}
          className="p-2 border rounded-lg mt-1"
          onChange={(e) =>
            setData({
              ...data,
              [field.name]: e.target.value,
            })
          }
        />
      </div>
    ))
  )}

  {/* BUTTON */}
  <div className="col-span-2">
    <button
      type="submit"
      className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-500"
    >
      {loading ? "Predicting..." : "Predict"}
    </button>
  </div>

</form>

        {/* ✅ RESULT SECTION */}
        {prediction !== null && (
          <div className="mt-6 text-center">

            <p className="text-lg font-semibold">
              Result: {prediction === 1 ? "Diabetic" : "Non-Diabetic"}
            </p>

   <p>
  Probability:{" "}
  {!isNaN(probability)
    ? (probability * 100).toFixed(2) + "%"
    : "N/A"}
</p>

            {/* 🔥 SHAP */}
            <div className="mt-4 text-left">
              <h3 className="font-bold text-blue-700">Why this prediction?</h3>

            {explanation
  .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
  .slice(0, 3)
  .map((item, index) => (
    <p key={index}>
      {item.feature}: <b>{item.value}</b> →{" "}
      {explainImpact(item.impact)}
    </p>
))}
            </div>

            <button
              onClick={goToPreventive}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl"
            >
              View Preventive Measures
            </button>


          </div>
        )}
        
      </div>
    </div>
  );
}
function explainImpact(val) {
  if (val > 0.3) return "Strongly increases risk 🔴";
  if (val > 0.1) return "Slightly increases risk 🟠";
  if (val < -0.3) return "Strongly decreases risk 🟢";
  if (val < -0.1) return "Slightly decreases risk 🟢";
  return "No major impact ⚪";
}
/* ---------------- ROUTES ---------------- */
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/predict" element={<PredictionPage />} />
      <Route path="/preventive" element={<PreventivePage />} />
    </Routes>
    <Chatbot/>
    </>
    
  );
}

export default App;
//pppp
