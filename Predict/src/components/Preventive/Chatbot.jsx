import { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";



/* ── Local FAQ fallback (works 100% offline) ── */
const FAQ = [
  {
    keys: ["what is diabetes", "define diabetes", "diabetes mean", "explain diabetes", "types of diabetes"],
    answer: "Diabetes is a chronic condition where the body cannot properly regulate blood sugar (glucose).\n\nType 1: The immune system destroys insulin-producing cells. Requires daily insulin.\n\nType 2: The body doesn't use insulin effectively. Most common, often linked to lifestyle.\n\nGestational: Develops during pregnancy, usually resolves after birth.",
  },
  {
    keys: ["symptoms", "signs", "how do i know", "feel like", "diabetic feel"],
    answer: "Common diabetes symptoms include:\n- Frequent urination\n- Excessive thirst\n- Unexplained weight loss\n- Constant fatigue\n- Blurred vision\n- Slow-healing cuts or wounds\n- Tingling or numbness in hands/feet\n- Frequent infections\n\nType 1 symptoms appear rapidly; Type 2 often develops gradually.",
  },
  {
    keys: ["normal glucose", "blood sugar level", "glucose level", "sugar level", "normal blood sugar", "fasting glucose"],
    answer: "Normal blood sugar levels:\n- Fasting: 70–100 mg/dL\n- 2 hours after eating: below 140 mg/dL\n- HbA1c (3-month average): below 5.7%\n\nPre-diabetes: Fasting 100–125 mg/dL or HbA1c 5.7–6.4%\nDiabetes: Fasting ≥126 mg/dL or HbA1c ≥6.5%",
  },
  {
    keys: ["prevent", "prevention", "avoid diabetes", "reduce risk", "lower risk"],
    answer: "Key diabetes prevention strategies:\n1. Maintain a healthy weight (losing 5–7% of body weight significantly reduces risk)\n2. Exercise 30 minutes daily (brisk walking, cycling, swimming)\n3. Eat a balanced diet — whole grains, vegetables, lean proteins\n4. Limit sugar, refined carbs, and processed foods\n5. Stay hydrated — drink 8+ glasses of water daily\n6. Get 7–8 hours of quality sleep\n7. Manage stress through meditation or yoga\n8. Get regular blood sugar screenings",
  },
  {
    keys: ["diet", "food", "eat", "meal", "nutrition", "what to eat", "avoid food"],
    answer: "Diabetes-friendly diet tips:\n\nEat more: vegetables, leafy greens, whole grains, legumes, lean proteins (chicken, fish), nuts, berries\n\nLimit: white bread, white rice, sugary drinks, sweets, processed snacks, full-fat dairy\n\nAvoid: soda, fruit juices, candy, pastries, fried foods\n\nPractice portion control and eat at regular times to keep blood sugar stable.",
  },
  {
    keys: ["exercise", "workout", "physical activity", "walk", "sport", "yoga", "gym"],
    answer: "Exercise is one of the most powerful tools for managing diabetes:\n\n- Aim for 150 minutes of moderate activity per week\n- Brisk walking, cycling, swimming, and yoga are excellent\n- Strength training 2–3 times/week improves insulin sensitivity\n- Even a 10-minute walk after meals reduces blood sugar spikes\n- Always check blood sugar before and after intense exercise",
  },
  {
    keys: ["bmi", "body mass index", "weight", "obesity", "overweight"],
    answer: "BMI (Body Mass Index) measures body fat based on height and weight:\n- Under 18.5: Underweight\n- 18.5–24.9: Normal\n- 25–29.9: Overweight\n- 30+: Obese (high diabetes risk)\n\nFor diabetes prevention, a BMI between 18.5–24.9 is ideal. Losing even 5–10% of body weight can significantly improve blood sugar control.",
  },
  {
    keys: ["insulin", "inject", "insulin therapy", "insulin type"],
    answer: "Insulin is a hormone that helps glucose enter cells for energy. In diabetes:\n\nType 1: The body produces no insulin, so daily injections or an insulin pump are required.\n\nType 2: Some patients need insulin if other medications aren't enough.\n\nTypes of insulin: Rapid-acting, short-acting, intermediate-acting, and long-acting. Your doctor will prescribe the right type and dosage.",
  },
  {
    keys: ["blood pressure", "hypertension", "bp"],
    answer: "High blood pressure (hypertension) is very common in people with diabetes and increases the risk of heart disease and kidney damage.\n\nTarget blood pressure for diabetics: below 130/80 mmHg\n\nTo manage it: reduce salt intake, exercise regularly, maintain a healthy weight, avoid smoking and alcohol, take prescribed medications.",
  },
  {
    keys: ["hba1c", "a1c", "glycated hemoglobin", "average blood sugar"],
    answer: "HbA1c (Glycated Hemoglobin) reflects your average blood sugar over the past 2–3 months:\n\n- Below 5.7%: Normal\n- 5.7–6.4%: Pre-diabetes\n- 6.5% and above: Diabetes\n\nFor people with diabetes, a target HbA1c below 7% is generally recommended. It's checked every 3–6 months.",
  },
  {
    keys: ["complication", "kidney", "eye", "nerve", "heart", "damage", "diabetic complication"],
    answer: "Uncontrolled diabetes can cause serious complications:\n\n- Cardiovascular disease (heart attack, stroke)\n- Kidney disease (diabetic nephropathy)\n- Eye damage (diabetic retinopathy, blindness)\n- Nerve damage (neuropathy — tingling, pain)\n- Foot problems (poor circulation, infections)\n- Slow wound healing\n\nControlling blood sugar, blood pressure, and cholesterol prevents or delays these.",
  },
  {
    keys: ["medication", "medicine", "metformin", "drug", "tablet", "pill", "treatment"],
    answer: "Common diabetes medications include:\n\n- Metformin: Usually the first prescribed for Type 2. Reduces glucose production in the liver.\n- SGLT2 inhibitors (e.g., empagliflozin): Help kidneys remove excess glucose.\n- GLP-1 agonists (e.g., semaglutide): Stimulate insulin, reduce appetite.\n- Sulfonylureas: Stimulate the pancreas to produce more insulin.\n- Insulin injections: Essential for Type 1; sometimes needed in Type 2.\n\nAlways follow your doctor's prescription.",
  },
  {
    keys: ["stress", "mental health", "anxiety", "depression", "sleep", "cortisol"],
    answer: "Stress raises cortisol levels, which increases blood sugar — making stress management critical for diabetics.\n\nTips:\n- Practice daily meditation or deep breathing (10–15 minutes)\n- Get 7–8 hours of sleep consistently\n- Exercise regularly to reduce cortisol\n- Talk to a counselor or join a diabetes support group\n- Limit screen time before bed",
  },
  {
    keys: ["risk factor", "who gets diabetes", "am i at risk", "chance of diabetes", "family history"],
    answer: "Risk factors for Type 2 diabetes:\n- Being overweight or obese\n- Physical inactivity\n- Family history of diabetes\n- Age 45 or older\n- History of gestational diabetes\n- High blood pressure\n- Abnormal cholesterol levels\n- Polycystic ovary syndrome (PCOS)\n\nHaving multiple risk factors doesn't mean you'll develop diabetes — lifestyle changes can significantly lower your risk.",
  },
  {
    keys: ["water", "hydration", "drink water", "thirst"],
    answer: "Proper hydration is important for blood sugar control:\n- Aim for 8–10 glasses (2–2.5 litres) of water daily\n- Water helps kidneys flush out excess glucose through urine\n- Avoid sugary drinks, juices, and sodas — they spike blood sugar\n- Herbal teas (unsweetened) and infused water are good alternatives\n- Excessive thirst is a diabetes symptom — check blood sugar if experiencing it",
  },

  // ── App-specific fields ──
  {
    keys: ["dpf", "diabetes pedigree", "pedigree function", "pedigree", "genetic score", "family score"],
    answer: "DPF stands for Diabetes Pedigree Function — a score that estimates your genetic diabetes risk based on family history.\n\nRough guide:\n- 0.0–0.4: No or minimal family history\n- 0.5–0.8: One parent or sibling with diabetes\n- 1.0–2.5: Multiple close relatives with diabetes\n\nIf you don't have a lab value, estimate based on your family history above. The average is around 0.4–0.5.",
  },
  {
    keys: ["skin thickness", "skinfold", "triceps", "skin fold", "skin measurement"],
    answer: "Skin Thickness (triceps skinfold) measures the fat layer at the back of your upper arm. It's an indicator of body fat percentage.\n\nTypical values:\n- Lean: 10–15 mm\n- Average: 20–25 mm\n- Higher body fat: 30–50 mm\n\nIf you don't have a measurement, use 20 as a reasonable average. A healthcare provider can measure it with skinfold calipers.",
  },
  {
    keys: ["insulin level", "insulin value", "serum insulin", "insulin test", "insulin number", "what insulin"],
    answer: "In the prediction form, 'Insulin' refers to your 2-hour serum insulin level (μU/mL) from an oral glucose tolerance test.\n\nNormal ranges:\n- Fasting insulin: 2–25 μU/mL\n- 2-hour post-glucose: below 30 μU/mL\n- Insulin resistance range: above 25 μU/mL fasting\n\nIf you don't have a lab result, entering 80 is a reasonable average for most people.",
  },
  {
    keys: ["blood pressure value", "which bp", "diastolic", "bp number", "bp value", "what bp", "systolic"],
    answer: "In the prediction form, 'Blood Pressure' refers to the diastolic value — the lower number in a reading like 120/80.\n\nNormal diastolic ranges:\n- Normal: 60–80 mmHg\n- Elevated: 80–89 mmHg\n- High: 90+ mmHg (hypertension)\n\nExample: If your BP is 130/85, enter 85 in the form.",
  },
  {
    keys: ["pregnancies", "pregnancy field", "number of pregnancies", "male pregnancy", "zero pregnancy", "why pregnancies"],
    answer: "The Pregnancies field asks how many times you have been pregnant.\n\nWhy it matters: Gestational diabetes (diabetes during pregnancy) significantly raises the long-term risk of Type 2 diabetes. Each pregnancy also affects insulin sensitivity.\n\nIf you are male, enter 0.\nIf you have never been pregnant, enter 0.",
  },
  {
    keys: ["glucose value", "what glucose", "which glucose", "glucose input", "what to enter glucose", "oral glucose", "ogtt"],
    answer: "In the form, 'Glucose' refers to the plasma glucose level (mg/dL) taken 2 hours after an oral glucose tolerance test (OGTT).\n\nReference ranges:\n- Normal: below 140 mg/dL\n- Pre-diabetes: 140–199 mg/dL\n- Diabetes: 200+ mg/dL\n\nIf you only have a fasting glucose reading, that also works:\n- Normal fasting: 70–100 mg/dL\n- Pre-diabetes fasting: 100–125 mg/dL\n- Diabetes fasting: 126+ mg/dL",
  },
  {
    keys: ["how to calculate bmi", "bmi formula", "calculate bmi", "bmi calculation"],
    answer: "BMI Formula:\nBMI = Weight (kg) ÷ Height (m)²\n\nExample: 70 kg, 1.75 m tall\nBMI = 70 ÷ (1.75 × 1.75) = 22.9 (Normal)\n\nCategories:\n- Below 18.5: Underweight\n- 18.5–24.9: Normal weight\n- 25–29.9: Overweight\n- 30+: Obese (high diabetes risk)",
  },
  {
    keys: ["probability", "percentage", "what does probability mean", "risk percentage", "score mean", "what does the result mean", "result mean"],
    answer: "The probability percentage shows how likely our AI model thinks you are to have or develop diabetes, based on your health data:\n\n- Below 40%: Low Risk — your profile is healthy, maintain your lifestyle\n- 40%–70%: Medium Risk — early lifestyle changes are strongly recommended\n- Above 70%: High Risk — immediate medical attention and lifestyle changes advised\n\nThis is NOT a medical diagnosis. Always consult a qualified doctor for professional evaluation.",
  },
  {
    keys: ["low risk", "medium risk", "high risk", "risk level", "what does low risk mean", "what does high risk mean"],
    answer: "Your risk level is determined by the AI model's probability score:\n\nLow Risk (below 40%): Your health profile looks good. Keep up healthy habits — regular exercise, balanced diet, and routine check-ups.\n\nMedium Risk (40%–70%): You have moderate risk factors. Early action through lifestyle changes can reverse or prevent progression.\n\nHigh Risk (above 70%): Your profile indicates significant risk. Lifestyle changes AND a medical consultation are strongly recommended.",
  },
  {
    keys: ["why this prediction", "shap", "strongly increases", "slightly increases", "decreases risk", "impact", "explanation", "why am i"],
    answer: "The 'Why this prediction?' section shows which health metrics influenced your result the most:\n\nStrongly increases risk (red): This value is well above the safe range — it's a major contributor to your risk score.\n\nSlightly increases risk (orange): This value is somewhat elevated — worth monitoring.\n\nStrongly decreases risk (green): This value is healthy and working in your favor.\n\nNo major impact (white): This factor didn't significantly affect your score.\n\nFocus on improving the factors marked red or orange first.",
  },
  {
    keys: ["pre-diabetes", "prediabetes", "borderline diabetes", "borderline"],
    answer: "Pre-diabetes means your blood sugar is higher than normal but not high enough to be diagnosed as Type 2 diabetes.\n\nPre-diabetes ranges:\n- Fasting glucose: 100–125 mg/dL\n- 2-hour glucose: 140–199 mg/dL\n- HbA1c: 5.7%–6.4%\n\nThe good news: pre-diabetes can often be fully reversed with lifestyle changes — losing 5–7% of body weight, exercising 150 minutes/week, and reducing sugar intake.",
  },
  {
    keys: ["insulin resistance", "insulin sensitivity", "resistant to insulin"],
    answer: "Insulin resistance is when your cells don't respond properly to insulin, so your pancreas produces more to compensate. Over time, the pancreas can't keep up, leading to Type 2 diabetes.\n\nCommon signs:\n- Fatigue after meals\n- Difficulty losing weight\n- Frequent hunger shortly after eating\n- High fasting insulin levels (above 25 μU/mL)\n\nHow to reverse it:\n- Exercise (especially strength training and walking after meals)\n- Lose excess body weight\n- Reduce refined carbs and sugar\n- Improve sleep quality",
  },
  {
    keys: ["advanced mode", "simple mode", "which mode", "mode difference"],
    answer: "DiabetesPredict offers two input modes:\n\nSimple Mode: Answer 5 easy yes/no questions (family history, overweight, thirst, urination, age group). Best if you don't have lab results.\n\nAdvanced Mode: Enter 8 clinical values (Glucose, BMI, Blood Pressure, Insulin, etc.). Best if you have recent lab test results for more accurate predictions.",
  },
  {
    keys: ["accurate", "accuracy", "reliable", "trust the result", "how accurate", "98%"],
    answer: "DiabetesPredict uses a Random Forest machine learning model trained on clinical diabetes data with approximately 98% accuracy on test data.\n\nHowever:\n- This tool is for informational purposes only\n- It is NOT a substitute for professional medical diagnosis\n- Accuracy depends on the quality of data you enter\n- Always consult a doctor to confirm any health concerns\n\nUse this as a helpful screening tool, not a definitive answer.",
  },
];

function getLocalAnswer(message) {
  const lower = message.toLowerCase();
  for (const entry of FAQ) {
    if (entry.keys.some((k) => lower.includes(k))) {
      return entry.answer;
    }
  }
  return null;
}

/* ── Try backend first, fall back to local FAQ ── */
async function askQuestion(message) {
  // 1. Try backend (server-side Gemini call — works reliably)
  try {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch {
    // backend offline — fall through to local FAQ
  }

  // 2. Local FAQ fallback
  const local = getLocalAnswer(message);
  if (local) return local;

  // 3. Generic offline response
  return (
    "I can answer questions about diabetes topics such as symptoms, blood sugar levels, " +
    "diet, exercise, medications, BMI, HbA1c, risk factors, and complications. " +
    "Please ask me something related to diabetes!"
  );
}



const INITIAL_MESSAGE = {
  text: "Hi! I'm your Diabetes AI Assistant. Ask me anything about diabetes, blood sugar, diet, or prevention.",
  sender: "bot",
};

/* ── Typing dots indicator ── */
function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  /* Auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (quickText) => {
    const message = quickText || input.trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askQuestion(message);
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I couldn't connect right now. Please check your internet and try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── FAB button ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open diabetes assistant"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
      >
        {isOpen ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </button>

      {/* ── Chat window ── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
          style={{ fontFamily: "Source Sans 3, sans-serif" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-base shrink-0">
                👨‍⚕️
              </div>
              <div>
                <p
                  className="text-white font-bold text-sm leading-tight"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Diabetes Assistant
                </p>
                <p className="text-blue-100 text-xs">Powered by Gemini AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-600 to-teal-500 text-white rounded-2xl rounded-br-sm"
                      : "bg-white text-slate-700 border border-slate-100 shadow-sm rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-t border-slate-100 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about diabetes..."
              disabled={loading}
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-400 transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
            >
              <FiSend size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
