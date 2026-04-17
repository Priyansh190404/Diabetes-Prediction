import walking from "../../assets/walking.jpg";
import yoga from "../../assets/yoga.jpg";
import strength from "../../assets/strength.jpg";
import meditation from "../../assets/meditation.jpg";
import fruits from "../../assets/fruits.jpg";
import lowSugar from "../../assets/low_sugar.jpg";
import hydration from "../../assets/hydration.jpg";
import sleep from "../../assets/sleep.jpg";

/* 🔥 Master function returning data based on risk */

export const getPreventiveData = (risk) => {

  /* ---------------- LOW RISK ---------------- */

  if (risk === "low") {
    return [
      {
        title: "✅ Maintain Healthy Lifestyle",
        subtitle: "You are safe but consistency matters",
        items: [
          {
            title: "Regular Walking",
            description: "Maintains insulin balance and overall fitness.",
            image: walking,
            extra: "20–30 minutes light walking daily keeps metabolism active."
          },
          {
            title: "Balanced Diet",
            description: "Helps maintain sugar stability naturally.",
            image: fruits,
            extra: "Focus on fruits, vegetables, and fiber-rich meals."
          },
          {
            title: "Proper Hydration",
            description: "Supports metabolism and glucose regulation.",
            image: hydration,
            extra: "Drink at least 2–2.5 litres water daily."
          }
        ]
      }
    ];
  }

  /* ---------------- MEDIUM RISK ---------------- */

  if (risk === "medium") {
    return [
      {
        title: "⚠️ Lifestyle Improvement Required",
        subtitle: "Risk is moderate — early action can reverse it",
        items: [
          {
            title: "Brisk Walking / Cardio",
            description: "Improves glucose utilisation in muscles.",
            image: walking,
            extra: "30–40 minutes cardio daily is recommended."
          },
          {
            title: "Yoga & Stress Control",
            description: "Balances hormonal response and insulin sensitivity.",
            image: yoga,
            extra: "Practice Kapalbhati, Surya Namaskar & breathing yoga."
          },
          {
            title: "Low Sugar Diet",
            description: "Reduces sudden glucose spikes.",
            image: lowSugar,
            extra: "Avoid cold drinks, bakery items, and packaged food."
          },
          {
            title: "Sleep Optimisation",
            description: "Sleep quality directly impacts insulin control.",
            image: sleep,
            extra: "Maintain 7–8 hours of consistent sleep."
          }
        ]
      }
    ];
  }

  /* ---------------- HIGH RISK ---------------- */

  return [
    {
      title: "🚨 High Risk Preventive Plan",
      subtitle: "Immediate lifestyle + medical attention recommended",
      items: [
        {
          title: "Structured Exercise Routine",
          description: "Essential for blood sugar control.",
          image: strength,
          extra: "Combine strength training + cardio at least 5 days/week."
        },
        {
          title: "Medical Diet Monitoring",
          description: "Diet must be carefully controlled.",
          image: lowSugar,
          extra: "Follow low GI and doctor recommended nutrition plan."
        },
        {
          title: "Daily Meditation",
          description: "Stress strongly increases insulin resistance.",
          image: meditation,
          extra: "Practice 10–15 minutes breathing meditation daily."
        },
        {
          title: "Sleep & Recovery Discipline",
          description: "Hormonal recovery depends on sleep quality.",
          image: sleep,
          extra: "Avoid screens 1 hour before sleep."
        },
        {
          title: "Hydration Monitoring",
          description: "Maintains glucose circulation and kidney health.",
          image: hydration,
          extra: "Drink 2.5–3 litres water daily."
        }
      ]
    }
  ];
};