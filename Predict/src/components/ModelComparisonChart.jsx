import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiBarChart2 } from "react-icons/fi";

/* ── Model colour palette ── */
const MODEL_STYLES = {
  "Random Forest": {
    bar: "bg-gradient-to-r from-blue-500 to-blue-600",
    dot: "bg-blue-500",
    text: "text-blue-600",
    ring: "ring-blue-300",
    card: "border-blue-400 bg-blue-50/60",
    badge: "bg-blue-600",
  },
  "Logistic Regression": {
    bar: "bg-gradient-to-r from-violet-500 to-purple-600",
    dot: "bg-violet-500",
    text: "text-violet-600",
    ring: "ring-violet-300",
    card: "border-violet-300 bg-violet-50/40",
    badge: "bg-violet-600",
  },
  "XGBoost": {
    bar: "bg-gradient-to-r from-orange-400 to-amber-500",
    dot: "bg-orange-400",
    text: "text-orange-500",
    ring: "ring-orange-300",
    card: "border-orange-300 bg-orange-50/40",
    badge: "bg-orange-500",
  },
  "SVM (Linear)": {
    bar: "bg-gradient-to-r from-teal-500 to-emerald-500",
    dot: "bg-teal-500",
    text: "text-teal-600",
    ring: "ring-teal-300",
    card: "border-teal-300 bg-teal-50/40",
    badge: "bg-teal-600",
  },
};

const DEFAULT_STYLES = {
  bar: "bg-slate-400",
  dot: "bg-slate-400",
  text: "text-slate-600",
  ring: "ring-slate-300",
  card: "border-slate-200 bg-slate-50",
  badge: "bg-slate-500",
};

const METRICS = [
  { key: "accuracy",  label: "Accuracy",  icon: "🎯" },
  { key: "precision", label: "Precision", icon: "🔬" },
  { key: "recall",    label: "Recall",    icon: "📡" },
  { key: "f1_score",  label: "F1 Score",  icon: "⚖️" },
];

const FALLBACK = {
  "Logistic Regression": { accuracy: 0.7725, precision: 0.76, recall: 0.76, f1_score: 0.75 },
  "XGBoost":             { accuracy: 0.9043, precision: 0.90, recall: 0.90, f1_score: 0.90 },
  "Random Forest":       { accuracy: 0.9819, precision: 0.98, recall: 0.96, f1_score: 0.97 },
  "SVM (Linear)":        { accuracy: 0.7851, precision: 0.74, recall: 0.58, f1_score: 0.65 },
};

export default function ModelComparisonChart() {
  const [data, setData]           = useState(null);
  const [bestModel, setBestModel] = useState(null);
  const [metric, setMetric]       = useState("accuracy");
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetch("https://diabetes-prediction-api-t1qb.onrender.com/comparison")
      .then((r) => r.json())
      .then((res) => {
        setData(res.models);
        setBestModel(res.best_model);
      })
      .catch(() => {
        setData(FALLBACK);
        setBestModel("Random Forest");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-8 bg-white/80 rounded-2xl p-8 flex items-center justify-center gap-2 text-slate-400 border border-slate-100 shadow">
        <FiBarChart2 size={18} className="animate-pulse" />
        <span className="text-sm font-medium">Loading model comparison…</span>
      </div>
    );
  }

  if (!data) return null;

  const models = Object.keys(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mt-8 rounded-2xl overflow-hidden shadow-xl border border-slate-200/70"
    >
      {/* ── Header bar ── */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FiBarChart2 className="text-blue-400" size={20} />
          <h3
            className="text-white font-extrabold text-lg"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            🔥 Model Performance Comparison
          </h3>
        </div>

        {bestModel && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, delay: 0.35 }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 text-xs font-black px-3 py-1.5 rounded-full shadow-lg shrink-0"
          >
            <FiAward size={12} />
            ✅ Best Model Selected: {bestModel}
          </motion.div>
        )}
      </div>

      <div className="bg-white/90 backdrop-blur-md p-6">

        {/* ── Summary cards ── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {models.map((model, idx) => {
            const s      = MODEL_STYLES[model] || DEFAULT_STYLES;
            const isBest = model === bestModel;
            const acc    = (data[model].accuracy * 100).toFixed(1);

            return (
              <motion.div
                key={model}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`relative rounded-xl border-2 p-3 pt-5 text-center transition-shadow ${
                  isBest ? `${s.card} shadow-md ring-2 ${s.ring}` : "border-slate-100 bg-slate-50"
                }`}
              >
                {isBest && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow whitespace-nowrap">
                    ✅ SELECTED
                  </span>
                )}
                <p
                  className={`text-[11px] font-bold leading-tight ${
                    isBest ? "text-blue-700" : "text-slate-600"
                  }`}
                >
                  {model}
                </p>
                <p
                  className={`text-3xl font-black mt-1 ${
                    isBest ? "text-blue-600" : "text-slate-700"
                  }`}
                >
                  {acc}%
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Accuracy</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Metric tabs ── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                metric === m.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* ── Animated bars ── */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {models.map((model, idx) => {
              const s      = MODEL_STYLES[model] || DEFAULT_STYLES;
              const isBest = model === bestModel;
              const pct    = (data[model][metric] * 100).toFixed(1);

              return (
                <div
                  key={model}
                  className={`rounded-xl p-3 ${
                    isBest ? `ring-1 ${s.ring} bg-blue-50/50` : "bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dot}`} />
                      <span className="text-sm font-semibold text-slate-700">
                        {model}
                      </span>
                      {isBest && (
                        <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                          ⭐ Best
                        </span>
                      )}
                    </div>
                    <span className={`text-sm font-bold tabular-nums ${s.text}`}>
                      {pct}%
                    </span>
                  </div>

                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      key={metric + model}
                      className={`h-full rounded-full ${s.bar}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        duration: 0.75,
                        ease: "easeOut",
                        delay: idx * 0.09,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Legend + footnote ── */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            {models.map((model) => {
              const s = MODEL_STYLES[model] || DEFAULT_STYLES;
              return (
                <div key={model} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                  <span className="text-xs text-slate-500">{model}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400">
            Diabetes Dataset · 80/20 train-test split
          </p>
        </div>
      </div>
    </motion.div>
  );
}
