import "./Preventive.css";
import PreventiveCard from "./PreventiveCard";
import {
  getPreventiveData
} from "./preventiveData";

function PreventivePage() {

  /* 🔥 SIMULATED RISK LEVEL
     Later you will pass this from prediction page */
  const riskLevel = "high"; // change low / medium / high

  const data = getPreventiveData(riskLevel);

  return (
    <div className="preventive-container">

      <h1 className="main-title">
        Preventive Measures ({riskLevel.toUpperCase()} Risk)
      </h1>

      {data.map((section, index) => (
        <div key={index}>

          <h2 className="section-title">
            {section.title}
          </h2>

          <div className="card-grid">
            {section.items.map((item, i) => (
              <PreventiveCard key={i} {...item} />
            ))}
          </div>

        </div>
      ))}

    </div>
  );
}

export default PreventivePage;
