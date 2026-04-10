import { Dialog } from "radix-ui";
import { FiInfo, FiX } from "react-icons/fi";

const FIELDS = [
  {
    icon: "🤰",
    name: "Pregnancies",
    range: "0 – 20",
    unit: "count",
    what: "Total number of times you have been pregnant (including miscarriages or stillbirths).",
    how: "Simply count your total pregnancies.\n\nIf you are male or have never been pregnant → enter 0.\n\nWhy it matters: Each pregnancy can affect insulin sensitivity, and gestational diabetes greatly raises long-term Type 2 diabetes risk.",
  },
  {
    icon: "🩸",
    name: "Glucose",
    range: "50 – 300",
    unit: "mg/dL",
    what: "Plasma glucose concentration 2 hours after an oral glucose tolerance test (OGTT).",
    how: "Reference ranges:\n• Normal: 70 – 140 mg/dL\n• Pre-diabetes: 140 – 199 mg/dL\n• Diabetes: 200+ mg/dL\n\nIf you only have a fasting glucose reading:\n• Normal fasting: 70 – 100 mg/dL\n• Pre-diabetes fasting: 100 – 125 mg/dL\n• Diabetes fasting: 126+ mg/dL",
  },
  {
    icon: "💓",
    name: "Blood Pressure",
    range: "40 – 130",
    unit: "mmHg",
    what: "Diastolic blood pressure — the lower number in a BP reading (e.g., 80 from '120/80').",
    how: "Take the second (bottom) number from your blood pressure reading.\n\nExample: If your BP is 130/85 → enter 85\n\nReference:\n• Normal: 60 – 80 mmHg\n• Elevated: 80 – 89 mmHg\n• High (hypertension): 90+ mmHg",
  },
  {
    icon: "📏",
    name: "Skin Thickness",
    range: "5 – 60",
    unit: "mm",
    what: "Triceps skinfold thickness — thickness of the fat layer at the back of the upper arm. Used as an indicator of body fat percentage.",
    how: "Measured with skinfold calipers by a healthcare provider.\n\nEstimate if you don't have a measurement:\n• Lean build: 10 – 15 mm\n• Average build: 20 – 25 mm\n• Heavier build: 30 – 50 mm\n\nNo measurement? Enter 20 (population average).",
  },
  {
    icon: "💉",
    name: "Insulin",
    range: "0 – 300",
    unit: "μU/mL",
    what: "2-hour serum insulin level measured after an oral glucose tolerance test (OGTT). Indicates how much insulin your pancreas is producing.",
    how: "Normal ranges:\n• Fasting insulin: 2 – 25 μU/mL\n• 2-hour post-glucose: below 30 μU/mL\n• Possible insulin resistance: above 25 μU/mL (fasting)\n\nNo lab result? Enter 80 (reasonable population average).",
  },
  {
    icon: "⚖️",
    name: "BMI",
    range: "15 – 60",
    unit: "kg/m²",
    what: "Body Mass Index — estimates body fat based on your weight and height.",
    how: "Formula:\nBMI = Weight (kg) ÷ Height (m)²\n\nExample: 70 kg, height 1.75 m\nBMI = 70 ÷ (1.75 × 1.75) = 22.9\n\nCategories:\n• Below 18.5 → Underweight\n• 18.5 – 24.9 → Normal weight\n• 25 – 29.9 → Overweight\n• 30+ → Obese (high diabetes risk)",
  },
  {
    icon: "🧬",
    name: "DPF (Diabetes Pedigree Function)",
    range: "0.0 – 3.0",
    unit: "score",
    what: "A score that estimates your genetic diabetes risk based on how many close relatives have had diabetes and how closely related they are.",
    how: "Estimate from your family history:\n• 0.2 – 0.4 → No family history of diabetes\n• 0.5 – 0.8 → One parent or sibling has diabetes\n• 1.0 – 1.5 → Both parents have diabetes\n• 1.5 – 2.5 → Multiple close relatives have diabetes\n\nPopulation average is around 0.4 – 0.5.\nIf unsure, enter 0.4 as a neutral starting point.",
  },
  {
    icon: "🎂",
    name: "Age",
    range: "1 – 120",
    unit: "years",
    what: "Your current age in full years.",
    how: "Simply enter your age.\n\nNote: Diabetes risk increases significantly after age 45. Age is one of the strongest predictors in the model — even with good metrics, risk rises naturally with age.",
  },
];

/* ── Individual field card ── */
function FieldCard({ field, index }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-50 border-b border-slate-100">
        <span className="text-2xl">{field.icon}</span>
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-slate-900 text-sm"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {field.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Range: {field.range} {field.unit}</p>
        </div>
        <span className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white text-xs font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>
          {index + 1}
        </span>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 space-y-3">
        {/* What it is */}
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">What it is</p>
          <p className="text-sm text-slate-600 leading-relaxed">{field.what}</p>
        </div>

        {/* How to find / calculate */}
        <div>
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">How to find / calculate</p>
          <pre className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-sans">{field.how}</pre>
        </div>
      </div>
    </div>
  );
}

export default function FieldsGuide() {
  return (
    <Dialog.Root>
      {/* Trigger button */}
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors px-3 py-1.5 rounded-xl"
          title="Learn what each field means and how to calculate it"
        >
          <FiInfo size={15} />
          Field Guide
        </button>
      </Dialog.Trigger>

      {/* Portal */}
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fadeInUp" />

        {/* Content */}
        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[88vh] bg-[#F5F9FF] rounded-3xl shadow-2xl flex flex-col outline-none data-[state=open]:animate-fadeInUp"
          style={{ fontFamily: "Source Sans 3, sans-serif" }}
        >
          {/* Modal header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-5 rounded-t-3xl flex items-start justify-between shrink-0">
            <div>
              <Dialog.Title
                className="text-xl font-extrabold text-white"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Field Reference Guide
              </Dialog.Title>
              <Dialog.Description className="text-blue-100 text-sm mt-1">
                What each input means and how to calculate or find your values.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="text-white/70 hover:text-white transition-colors mt-0.5 p-1"
              >
                <FiX size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Scrollable field list */}
          <div className="overflow-y-auto flex-1 p-5 space-y-4">
            {FIELDS.map((field, i) => (
              <FieldCard key={field.name} field={field} index={i} />
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-slate-200 bg-white rounded-b-3xl shrink-0 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              💡 Use Simple Mode if you don't have lab values — it asks easy yes/no questions instead.
            </p>
            <Dialog.Close asChild>
              <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity">
                Got it!
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
