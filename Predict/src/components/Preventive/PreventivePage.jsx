import "./Preventive.css";
import PreventiveCard from "./PreventiveCard";
import { getPreventiveData } from "./preventiveData";

function PreventivePage() {

  const risk = localStorage.getItem("riskLevel") || "low";
  const data = getPreventiveData(risk);

  return (
    <div className="preventive-page">
      <div className="preventive-wrapper">
          

        <h1 className="main-title">
  Preventive Measures <span>({risk.toUpperCase()} Risk)</span>
</h1>
        {data.map((section, index) => (
          <div key={index}>
            <h2 className="section-title">{section.title}</h2>
            <p className="section-subtitle">{section.subtitle}</p>

            <div className="card-grid">
              {section.items.map((item, i) => (
                <PreventiveCard key={i} item={item} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default PreventivePage;