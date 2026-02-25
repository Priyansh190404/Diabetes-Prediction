
import { useState } from "react";
import diabetesBg from "./assets/diabetes.png";
import PreventivePage from "./components/Preventive/PreventivePage.jsx";

/* ---------------- Fields Config ---------------- */
const fields = [
  { name: "Pregnancies", label: "Pregnancies", min: 0, max: 20, desc: "Number of times pregnant" },
  { name: "Glucose", label: "Glucose (mg/dL)", min: 50, max: 300, desc: "Blood sugar level" },
  { name: "BloodPressure", label: "Blood Pressure (mm Hg)", min: 40, max: 130, desc: "Resting blood pressure" },
  { name: "SkinThickness", label: "Skin Thickness (mm)", min: 5, max: 60, desc: "Fat thickness under skin" },
  { name: "Insulin", label: "Insulin (µU/mL)", min: 0, max: 300, desc: "Insulin hormone level" },
  { name: "BMI", label: "BMI", min: 15, max: 60, desc: "Body Mass Index" },
  { name: "DiabetesPedigreeFunction", label: "Diabetes Pedigree Function", min: 0, max: 3, desc: "Family diabetes likelihood" },
  { name: "Age", label: "Age (years)", min: 1, max: 120, desc: "Your age" },
];

/* ---------- Simple Questions Mapping ---------- */
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

function App() {

  const [data, setData] = useState({});
  const [showPreventive, setShowPreventive] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
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

    /* ⭐ Default fallback values */
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

    /* ⭐ Risk Logic */
    let risk = "Low";

    if (result.probability >= 0.7) {
      risk = "High";
    } else if (result.probability >= 0.4) {
      risk = "Medium";
    }

    setRiskLevel(risk.toLowerCase());
    localStorage.setItem("riskLevel", risk.toLowerCase());

  } catch (err) {

    console.error(err);
    alert("Backend not running");

  } finally {

    setLoading(false);

  }
};

  /* ---------- Navigate Preventive ---------- */
 const goToPreventive = () => {
  localStorage.setItem("riskLevel", riskLevel);
  setShowPreventive(true);
};

  /* ---------- Show Preventive Page ---------- */
  if (showPreventive) {
    return <PreventivePage />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6 relative"
      style={{ backgroundImage: `url(${diabetesBg})` }}
    >
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="relative max-w-4xl w-full bg-white/75 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Diabetes Risk Prediction
        </h1>

        {/* Toggle */}
        <label className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={simpleMode}
            onChange={() => setSimpleMode(!simpleMode)}
          />
          I don't know medical values — Ask simple health questions
        </label>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

          {/* SIMPLE MODE */}
          {simpleMode && (
            <>
              {Object.keys(simpleAnswers).map((key) => (
                <div key={key}>
                  <label className="font-medium capitalize">
                    {key === "family" && "Family history of diabetes?"}
                    {key === "overweight" && "Are you overweight?"}
                    {key === "thirst" && "Do you feel excessive thirst?"}
                    {key === "urination" && "Frequent urination?"}
                    {key === "age" && "Age Group"}
                  </label>

                  <select
                    className="w-full mt-1 p-2 border rounded-xl"
                    value={simpleAnswers[key]}
                    onChange={(e) =>
                      setSimpleAnswers({ ...simpleAnswers, [key]: e.target.value })
                    }
                  >
                    {key === "age" ? (
                      <>
                        <option>Below 30</option>
                        <option>30-50</option>
                        <option>Above 50</option>
                      </>
                    ) : (
                      <>
                        <option>Yes</option>
                        <option>No</option>
                      </>
                    )}
                  </select>
                </div>
              ))}
            </>
          )}

          {/* MEDICAL MODE */}
          {!simpleMode &&
            fields.map((field) => (
              <div key={field.name}>
                <label className="font-medium">{field.label}</label>
                <p className="text-xs text-gray-500">{field.desc}</p>

                <input
                  type="number"
                  min={field.min}
                  max={field.max}
                  value={data[field.name] ?? ""}
                  onChange={(e) =>
                    setData({ ...data, [field.name]: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-xl"
                />
              </div>
            ))}

          <button
            type="submit"
            className="col-span-full mt-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-500"
          >
            {loading ? "Predicting..." : "🔍 Predict"}
          </button>
        </form>

        {/* Prediction Result */}
        {prediction !== null && (
          <div className="mt-6 text-center">

            <p>Probability: {(probability * 100).toFixed(2)}%</p>

            {/* Risk Display */}
           {/* Risk Display */}
<h2
  className={`text-xl font-bold 
    ${riskLevel === "high"
      ? "text-red-600"
      : riskLevel === "medium"
      ? "text-yellow-500"
      : "text-green-600"
    }
  `}
>
  {riskLevel === "high" && "⚠️ High Risk"}
  {riskLevel === "medium" && "🟡 Medium Risk"}
  {riskLevel === "low" && "✅ Low Risk"}
</h2>

            <button
              onClick={goToPreventive}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              View Preventive Measures
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;