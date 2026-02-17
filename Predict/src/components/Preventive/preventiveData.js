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

  const common = [

    {
      title: "🏃 Exercise",
      items: [
        {
          title: "Walking",
          description: "30 mins daily improves insulin sensitivity.",
          image: walking,
          extra: "Try brisk walking after meals."
        },
        {
          title: "Yoga",
          description: "Helps regulate hormones and stress.",
          image: yoga,
          extra: "Surya Namaskar & Kapalbhati recommended."
        },
        {
          title: "Strength Training",
          description: "Improves muscle glucose usage.",
          image: strength,
          extra: "Train at least 3 times weekly."
        }
      ]
    },

    {
      title: "🧠 Mindfulness",
      items: [
        {
          title: "Meditation",
          description: "Reduces cortisol levels.",
          image: meditation,
          extra: "10-15 minutes breathing meditation daily."
        }
      ]
    },

    {
      title: "🥗 Diet",
      items: [
        {
          title: "Fruits",
          description: "Choose low glycemic fruits.",
          image: fruits,
          extra: "Best options: Apple, Guava, Berries."
        },
        {
          title: "Low Sugar Diet",
          description: "Avoid sugary drinks & junk food.",
          image: lowSugar,
          extra: "Replace sugar with natural sweeteners."
        }
      ]
    },

    {
      title: "💧 Lifestyle",
      items: [
        {
          title: "Hydration",
          description: "2-3 litres water daily.",
          image: hydration,
          extra: "Helps maintain blood sugar balance."
        },
        {
          title: "Sleep",
          description: "Maintain 7-8 hrs sleep.",
          image: sleep,
          extra: "Sleep deprivation increases insulin resistance."
        }
      ]
    }

  ];

  /* 🔥 PERSONALIZED ADDITIONS */

  // if (risk === "high") {
  //   common.push({
  //     title: "⚠️ High Risk Alerts",
  //     items: [
  //       {
  //         title: "Regular Monitoring",
  //         description: "Check sugar weekly.",
  //         image: hydration,
  //         extra: "Consult doctor every 3-6 months."
  //       }
  //     ]
  //   });
  // }

  if (risk === "medium") {
    common.push({
      title: "⭐ Improvement Tips",
      items: [
        {
          title: "Weight Control",
          description: "Maintain healthy BMI.",
          image: walking,
          extra: "Focus on fat loss + muscle gain."
        }
      ]
    });
  }

  return common;
};
