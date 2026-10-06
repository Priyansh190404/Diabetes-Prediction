import { useState } from "react";
import { motion } from "framer-motion";
import diabetesBg from "./assets/diabetes.png";
import PreventivePage from "./components/Preventive/PreventivePage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Chatbot from "./components/Preventive/Chatbot.jsx";
import FieldsGuide from "./components/FieldsGuide.jsx";
import ModelComparisonChart from "./components/ModelComparisonChart.jsx";
import {
  FiUser, FiDroplet, FiHeart, FiLayers, FiActivity,
  FiTrendingUp, FiGitBranch, FiCalendar, FiArrowRight,
  FiUsers, FiEye, FiCheck,
} from "react-icons/fi";

/* ---------------- Fields Config ---------------- */
const fields = [
  { name: "Pregnancies",             label: "Pregnancies",   min: 0,  max: 20,  unit: "count",    Icon: FiUser },
  { name: "Glucose",                 label: "Glucose",        min: 50, max: 300, unit: "mg/dL",    Icon: FiDroplet },
  { name: "BloodPressure",           label: "Blood Pressure", min: 40, max: 130, unit: "mmHg",     Icon: FiHeart },
  { name: "SkinThickness",           label: "Skin Thickness", min: 5,  max: 60,  unit: "mm",       Icon: FiLayers },
  { name: "Insulin",                 label: "Insulin",        min: 0,  max: 300, unit: "μU/mL",    Icon: FiActivity },
  { name: "BMI",                     label: "BMI",            min: 15, max: 60,  unit: "kg/m²",    Icon: FiTrendingUp },
  { name: "DiabetesPedigreeFunction",label: "DPF",            min: 0,  max: 3,   unit: "score",    Icon: FiGitBranch },
  { name: "Age",                     label: "Age",            min: 1,  max: 120, unit: "years",    Icon: FiCalendar },
];

const simpleQuestions = [
  { key: "family",    label: "Family History of Diabetes?",  Icon: FiUsers },
  { key: "overweight",label: "Are you Overweight?",           Icon: FiTrendingUp },
  { key: "thirst",   label: "Excessive Thirst / Dry Mouth?", Icon: FiDroplet },
  { key: "urination",label: "Frequent Urination?",           Icon: FiActivity },
];

const mapAnswers = (ans) => ({
  Pregnancies: 0,
  // Normal fasting glucose < 100; diabetic > 140
  Glucose: ans.thirst === "Yes" ? 185 : 82,
  // Normal BP ~70; hypertensive 95+
  BloodPressure: ans.overweight === "Yes" ? 92 : 68,
  // Thin skin for healthy; thicker for overweight
  SkinThickness: ans.overweight === "Yes" ? 38 : 10,
  // Insulin high when thirsty (insulin resistance); low when healthy
  Insulin: ans.thirst === "Yes" ? 210 : 18,
  // Obese BMI 35; healthy BMI 21
  BMI: ans.overweight === "Yes" ? 36 : 21,
  // Family history raises DPF significantly
  DiabetesPedigreeFunction: ans.family === "Yes" ? 1.4 : 0.15,
  Age: ans.age === "Above 50" ? 62 : ans.age === "30-50" ? 40 : 24,
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
  const [formError, setFormError] = useState("");

  const [simpleAnswers, setSimpleAnswers] = useState({
    family: "No",
    overweight: "No",
    thirst: "No",
    urination: "No",
    age: "Below 30",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate advanced mode — all 8 fields must be filled
    if (!simpleMode) {
      const required = ["Pregnancies","Glucose","BloodPressure","SkinThickness","Insulin","BMI","DiabetesPedigreeFunction","Age"];
      const missing = required.filter((k) => data[k] === undefined || data[k] === "");
      if (missing.length > 0) {
        setFormError("Please fill in all fields before predicting.");
        return;
      }
    }
    setFormError("");
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
      className="min-h-screen bg-cover bg-center p-6 relative"
      style={{ backgroundImage: `url(${diabetesBg})` }}
    >
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="relative max-w-4xl mx-auto py-10">
      {/* ── Gradient accent strip ── */}
      <div className="bg-white/75 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-teal-400" />

        <div className="p-8">
          {/* ── Header ── */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div>
              <h1
                className="text-3xl font-extrabold text-slate-900 text-center"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Diabetes{" "}
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Risk Prediction
                </span>
              </h1>
              <p className="text-sm text-slate-400 text-center mt-0.5">
                Enter your clinical values to assess diabetes risk
              </p>
            </div>
            <FieldsGuide />
          </div>

          {/* ── Segmented Toggle ── */}
          <div className="flex justify-center mb-6">
            <div className="relative flex bg-slate-100 rounded-xl p-1 gap-1">
              {[
                { label: "Advanced", value: false, Icon: FiActivity },
                { label: "Simple",   value: true,  Icon: FiEye },
              ].map(({ label, value, Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setSimpleMode(value);
                    setFormError("");
                    setPrediction(null);
                    setProbability(null);
                    setExplanation([]);
                  }}
                  className={`relative flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold transition-colors z-10 ${
                    simpleMode === value
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {simpleMode === value && (
                    <motion.span
                      layoutId="mode-pill"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <Icon size={14} />
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            {simpleMode ? (
              /* ── SIMPLE MODE ── */
              <>
                {simpleQuestions.map((q, i) => (
                  <div key={i} className="col-span-1 flex flex-col gap-1">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      <q.Icon size={12} className="text-blue-500" />
                      {q.label}
                    </label>
                    <div className="flex gap-2">
                      {["Yes", "No"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setSimpleAnswers({ ...simpleAnswers, [q.key]: opt })}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                            simpleAnswers[q.key] === opt
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-200 bg-white text-slate-500 hover:border-blue-300"
                          }`}
                        >
                          {simpleAnswers[q.key] === opt && <FiCheck size={13} />}
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Age group */}
                <div className="col-span-2 flex flex-col gap-1">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    <FiCalendar size={12} className="text-blue-500" />
                    Age Group
                  </label>
                  <div className="flex gap-2">
                    {["Below 30", "30-50", "Above 50"].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setSimpleAnswers({ ...simpleAnswers, age: opt })}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                          simpleAnswers.age === opt
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-500 hover:border-blue-300"
                        }`}
                      >
                        {simpleAnswers.age === opt && <FiCheck size={13} />}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* ── ADVANCED MODE ── */
              fields.map((field, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    <field.Icon size={12} className="text-blue-500" />
                    {field.label}
                    <span className="ml-auto text-slate-400 font-normal normal-case tracking-normal">
                      {field.unit}
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <field.Icon size={15} />
                    </span>
                    <input
                      type="number"
                      min={field.min}
                      max={field.max}
                      placeholder={`${field.min} – ${field.max}`}
                      className="w-full pl-9 pr-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 bg-white transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-slate-300"
                      onChange={(e) => { setData({ ...data, [field.name]: e.target.value }); setFormError(""); }}
                    />
                  </div>
                </div>
              ))
            )}

            {/* ── Validation error ── */}
            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-2 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl"
              >
                <span className="text-base">⚠️</span>
                {formError}
              </motion.div>
            )}

            {/* ── Predict Button ── */}
            <div className="col-span-2 mt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                    />
                    Analysing…
                  </>
                ) : (
                  <>
                    Predict Risk
                    <FiArrowRight size={16} />
                  </>
                )}
              </motion.button>
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

            {/* 🔥 SHAP — Advanced mode only */}
            {!simpleMode && (
            <div className="mt-4 text-left">
              <h3 className="font-bold text-blue-700">Why this prediction?</h3>

            {explanation
  .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
  .slice(0, 3)
  .map((item, index) => (
    <p key={index}>
      {item.feature}: <b>{item.value}</b> →{" "}
      <span className={impactColor(item.impact)}>
        <b>{explainImpact(item.impact)}</b>
      </span>
    </p>
))}
            </div>
            )}

            <button
              onClick={goToPreventive}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl"
            >
              View Preventive Measures
            </button>


          </div>
        )}

        </div>{/* end p-8 */}
      </div>{/* end card */}

      {/* 🔥 Model Comparison Chart */}
      <ModelComparisonChart />

      </div>
    </div>
  );
}
function explainImpact(val) {
  const pct = (val * 100).toFixed(1);
  if (val > 0) return `+${pct}% risk`;
  if (val < 0) return `${pct}% risk`;
  return "0.0% risk";
}

function impactColor(val) {
  if (val > 0.1) return "text-red-600";
  if (val > 0) return "text-orange-500";
  if (val < -0.1) return "text-green-600";
  if (val < 0) return "text-teal-500";
  return "text-slate-400";
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
