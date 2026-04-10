import { useNavigate } from "react-router-dom";
import PreventiveCard from "./PreventiveCard";
import { getPreventiveData } from "./preventiveData";
import { FiActivity, FiArrowLeft, FiArrowRight } from "react-icons/fi";

/* ── Risk-level theme config ── */
const riskConfig = {
  low: {
    gradient: "from-teal-500 to-green-400",
    badgeClass: "bg-teal-50 border border-teal-200 text-teal-700",
    label: "LOW RISK",
    emoji: "✅",
    message:
      "Great news — you're in good shape! Consistency is key to staying healthy long-term.",
  },
  medium: {
    gradient: "from-orange-500 to-amber-400",
    badgeClass: "bg-orange-50 border border-orange-200 text-orange-700",
    label: "MEDIUM RISK",
    emoji: "⚠️",
    message:
      "Early action can make a big difference. Follow these recommendations closely to reverse your risk.",
  },
  high: {
    gradient: "from-red-600 to-rose-500",
    badgeClass: "bg-red-50 border border-red-200 text-red-700",
    label: "HIGH RISK",
    emoji: "🚨",
    message:
      "Immediate lifestyle changes and medical attention are strongly recommended. Act now.",
  },
};

function PreventivePage() {
  const navigate = useNavigate();
  const risk = localStorage.getItem("riskLevel") || "low";
  const config = riskConfig[risk] || riskConfig.low;
  const data = getPreventiveData(risk);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Source Sans 3, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-sm">
              <FiActivity className="text-white" size={17} />
            </div>
            <span
              className="text-xl font-extrabold text-slate-900"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Diabetes<span className="text-blue-600">Predict</span>
            </span>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate("/predict")}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-300 bg-white"
          >
            <FiArrowLeft size={14} />
            Back to Prediction
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative dot-grid-bg py-20 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center animate-fadeInUp">
          {/* Risk badge */}
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase ${config.badgeClass}`}
          >
            {config.emoji} {config.label}
          </span>

          <h1
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Your{" "}
            <span
              className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
            >
              Preventive Plan
            </span>
          </h1>

          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            {config.message}
          </p>


        </div>
      </section>

      {/* ── SECTIONS ── */}
      <div className="bg-[#F5F9FF] pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {data.map((section, index) => (
            <div key={index} className="pt-16">
              {/* Section header */}
              <div className="text-center mb-10">
                <h2
                  className="text-2xl md:text-3xl font-extrabold text-slate-900"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {section.title}
                </h2>
                <p className="mt-2 text-slate-500 text-base max-w-lg mx-auto">
                  {section.subtitle}
                </p>
              </div>

              {/* Card grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, i) => (
                  <PreventiveCard key={i} item={item} riskGradient={config.gradient} />
                ))}
              </div>
            </div>
          ))}

          {/* ── CTA BLOCK ── */}
          <div className="mt-20">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 p-10 md:p-14 text-center shadow-2xl">
              <div className="absolute -top-14 -right-14 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-14 -left-14 w-52 h-52 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative">
                <h2
                  className="text-2xl md:text-3xl font-extrabold text-white mb-3"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Want to Re-check Your Risk?
                </h2>
                <p className="text-blue-100 text-sm mb-8 max-w-sm mx-auto">
                  Go back and try different inputs to see how lifestyle changes affect your score.
                </p>
                <button
                  onClick={() => navigate("/predict")}
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center gap-2"
                >
                  Try Again <FiArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                  <FiActivity className="text-white" size={15} />
                </div>
                <span
                  className="text-lg font-extrabold text-white"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Diabetes<span className="text-teal-400">Predict</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                AI-powered diabetes risk prediction. Free and instant.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">
              © 2026 DiabetesPredict. For informational purposes only.
            </p>
            <p className="text-slate-700 text-xs">
              Not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PreventivePage;
