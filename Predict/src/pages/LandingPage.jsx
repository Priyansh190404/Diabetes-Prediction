import { useNavigate } from "react-router-dom";
import diabetesBg from "../assets/diabetes.png";
import {
  FiActivity,
  FiZap,
  FiShield,
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiBarChart2,
  FiClock,
  FiUnlock,
} from "react-icons/fi";
import { BsShieldCheck, BsLightningCharge, BsGraphUp } from "react-icons/bs";

/* ── reusable badge ── */
function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-l font-semibold tracking-widest uppercase">
      {children}
    </span>
  );
}

/* ── floating stat card ── */
function FloatCard({ icon, label, value, className = "" }) {
  return (
    <div className={`glass-card rounded-2xl  shadow-xl flex items-center gap-3 ${className}`}>
      <div className="w-9 h-9 rounded bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-base font-extrabold text-slate-900 leading-none" style={{ fontFamily: "Manrope, sans-serif" }}>{value}</p>
        <p className="text-xs text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

/* ── feature bento card ── */
function FeatureCard({ icon, title, desc, accent = false, className = "" }) {
  return (
    <div
      className={`group rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
        ${accent
          ? "bg-gradient-to-br from-blue-600 to-teal-500 border-transparent text-white"
          : "bg-white border-slate-100 text-slate-900"
        } ${className}`}
    >
      <div className={` h-11 rounded-xl flex items-center justify-center mb-4
        ${accent ? "bg-white/20" : "bg-blue-50"}`}>
        <span className={accent ? "text-white" : "text-blue-600"}>{icon}</span>
      </div>
      <h3 className={`font-bold text-base mb-1.5 ${accent ? "text-white" : "text-slate-900"}`}
        style={{ fontFamily: "Manrope, sans-serif" }}>{title}</h3>
      <p className={`text-sm leading-relaxed ${accent ? "text-blue-100" : "text-slate-500"}`}>{desc}</p>
    </div>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  <nav className="flex justify-between items-center px-8 py-4">
  <h1 className="text-2xl font-bold text-blue-600">
    DiabetesPredict
  </h1>

  <div className="flex gap-4">
    <button
      onClick={() => navigate("/help")}
      className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition"
    >
      Help
    </button>

    <button
      onClick={() => navigate("/predict")}
      className="bg-blue-600 text-white px-5 py-2 rounded-xl"
    >
      Check Your Risk →
    </button>
  </div>
</nav>

  const features = [
    { icon: <BsLightningCharge size={20} />, title: "Instant Results", desc: "Get your diabetes risk score in under 2 seconds — no waiting." },
    { icon: <BsGraphUp size={20} />, title: "AI-Powered", desc: "Machine learning model trained on real clinical data for reliable predictions.", accent: true },
    { icon: <FiHeart size={20} />, title: "Personalized Tips", desc: "Prevention advice tailored specifically to your risk profile and lifestyle." },
    { icon: <FiBarChart2 size={20} />, title: "8 Health Metrics", desc: "Glucose, BMI, blood pressure and 5 more indicators analyzed together." },
    { icon: <BsShieldCheck size={20} />, title: "3 Risk Levels", desc: "Low, Medium, and High classifications — with clear next steps for each." },
    { icon: <FiUnlock size={20} />, title: "100% Free", desc: "No signup, no credit card, no limits. Always free, always private." },
  ];

  const steps = [
    { num: "01", icon: <FiActivity size={24} />, title: "Enter Your Data", desc: "Provide 8 key health metrics, or simply answer straightforward health questions." },
    { num: "02", icon: <BsLightningCharge size={24} />, title: "AI Analysis", desc: "Our model instantly analyzes your profile with 98% clinical accuracy." },
    { num: "03", icon: <FiShield size={24} />, title: "Get Your Results", desc: "Receive your risk level with personalized prevention recommendations." },
  ];

  const stats = [
    { value: "98%", label: "Accuracy Rate" },
    { value: "<2s", label: "Result Speed" },
    { value: "8", label: "Health Metrics" },
    { value: "3", label: "Risk Levels" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "Source Sans 3, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-sm">
              <FiActivity className="text-white" size={17} />
            </div>
            <span className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>
              Diabetes<span className="text-blue-600">Predict</span>
            </span>
          </div>



          {/* CTA */}
          <button
            onClick={() => navigate("/predict")}
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            Check Your Risk <FiArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center dot-grid-bg overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-2 gap-16 items-center py-24">

          {/* LEFT */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <Badge>AI-Powered Health Analysis</Badge>

            <h1
              className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.07] tracking-tight text-slate-900"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Know Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Diabetes Risk
              </span>{" "}
              Before It Starts
            </h1>

            <p className="mt-5 text-lg text-slate-500 leading-relaxed max-w-lg">
              Get instant AI-powered risk analysis with personalized prevention tips — completely free, in seconds.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/predict")}
                className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
              >
                Start Free Prediction <FiArrowRight size={16} />
              </button>

            </div>

            {/* Trust strip */}
            <div className="mt-8 flex items-center gap-5 flex-wrap">
              {["No account needed", "Free forever", "Results in under 2s"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <FiCheck size={14} className="text-teal-500" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center md:justify-end animate-fadeInUp" style={{ animationDelay: "0.25s" }}>
            <div className="relative w-full max-w-md">

              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/60 animate-float">
                <img
                  src={diabetesBg}
                  alt="Diabetes monitoring devices — blood glucose meter, insulin and stethoscope"
                  className="w-full h-72 md:h-96 object-cover"
                />
              </div>

              {/* Floating cards */}
              <FloatCard
                icon={<BsGraphUp size={16} className="text-white" />}
                value="98%"
                label="Accuracy Rate"
                className="absolute -top-5 -left-6 animate-fadeInUp"
                style={{ animationDelay: "0.4s" }}
              />

              <FloatCard
                icon={<FiClock size={16} className="text-white" />}
                value="< 2s"
                label="Result Speed"
                className="absolute -bottom-5 -left-4 animate-fadeInUp"
                style={{ animationDelay: "0.55s" }}
              />

              <FloatCard
                icon={<BsShieldCheck size={16} className="text-white" />}
                value="Free &amp; Private"
                label="No data stored"
                className="absolute top-1/2 -right-8 -translate-y-1/2 animate-fadeInUp"
                style={{ animationDelay: "0.65s" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label} className="group">
              <p
                className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {value}
              </p>
              <p className="mt-1.5 text-sm text-slate-400 font-medium uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <Badge>Simple Process</Badge>
            <h2
              className="mt-4 text-3xl md:text-4xl font-extrabold text-white"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              How It Works
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-md mx-auto">
              Three simple steps to understand your health.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line on desktop */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-gradient-to-r from-blue-600/40 via-teal-500/40 to-blue-600/20" />

            {steps.map(({ num, icon, title, desc }, i) => (
              <div key={num} className="relative bg-slate-900 rounded-2xl p-7 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1">
                <span
                  className="block text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent mb-4"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {num}
                </span>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center mb-4 text-white">
                  {icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-[#F5F9FF]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <Badge>Features</Badge>
            <h2
              className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Why DiabetesPredict?
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-md mx-auto">
              Built for everyone — no medical degree required.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, desc, accent }) => (
              <FeatureCard key={title} icon={icon} title={title} desc={desc} accent={accent} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 p-12 md:p-16 text-center shadow-2xl">
            {/* Decorative blobs inside CTA */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              <h2
                className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Ready to Know Your Risk?
              </h2>
              <p className="text-blue-100 text-base mb-10 max-w-md mx-auto">
                Start your free prediction now — no account needed. Your data stays private.
              </p>

              <button
                onClick={() => navigate("/predict")}
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-base hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center gap-2"
              >
                Start Free Prediction <FiArrowRight size={16} />
              </button>

              <div className="mt-8 flex items-center justify-center gap-8 flex-wrap">
                {["No account needed", "Free forever", "Results in under 2s"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-blue-100">
                    <FiCheck size={14} className="text-teal-300" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Logo + tagline */}
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                  <FiActivity className="text-white" size={15} />
                </div>
                <span className="text-lg font-extrabold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
                  Diabetes<span className="text-teal-400">Predict</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                AI-powered diabetes risk prediction. Free and instant.
              </p>
            </div>


          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">© 2026 DiabetesPredict. For informational purposes only.</p>
            <p className="text-slate-700 text-xs">Not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
