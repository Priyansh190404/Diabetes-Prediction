import { motion } from "framer-motion";

export default function HelpPage() {
  const metrics = [
    {
      title: "BMI (Body Mass Index)",
      desc: "Measures body fat based on height and weight.",
      formula: "BMI = Weight (kg) / (Height (m))²",
      example: "Example: 70kg & 1.75m → BMI = 22.86",
    },
    {
      title: "Glucose",
      desc: "Blood sugar level (mg/dL).",
      formula: "Measured via blood test",
      example: "Normal: 70 - 140 mg/dL",
    },
    {
      title: "Blood Pressure",
      desc: "Force of blood against arteries.",
      formula: "Measured in mmHg (Systolic/Diastolic)",
      example: "Normal: 120/80 mmHg",
    },
    {
      title: "Insulin",
      desc: "Hormone controlling blood sugar.",
      formula: "Measured via lab test",
      example: "Normal: 16 - 166 μU/mL",
    },
    {
      title: "DPF (Diabetes Pedigree Function)",
      desc: "Genetic likelihood of diabetes.",
      formula: "Based on family history (ML calculated)",
      example: "Higher value = higher genetic risk",
    },
    {
      title: "Skin Thickness",
      desc: "Triceps skin fold thickness.",
      formula: "Measured using calipers (mm)",
      example: "Higher values may indicate fat accumulation",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-12">

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Understanding Health Metrics
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {metrics.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl shadow-lg bg-white/70 backdrop-blur-lg"
          >
            <h2 className="text-xl font-semibold text-blue-600">
              {item.title}
            </h2>

            <p className="text-gray-600 mt-2">{item.desc}</p>

            <p className="mt-3 font-medium text-gray-800">
              📌 Formula:
            </p>
            <p className="text-sm text-gray-700">{item.formula}</p>

            <p className="mt-2 text-sm text-gray-500">
              {item.example}
            </p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}