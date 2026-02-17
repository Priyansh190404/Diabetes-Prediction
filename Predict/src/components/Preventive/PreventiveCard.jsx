import { useState } from "react";
import "./Preventive.css";

function PreventiveCard({ title, description, image, extra }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="preventive-card"
      onClick={() => setExpanded(!expanded)}
    >
      <img src={image} alt={title} />

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>

        {expanded && extra && (
          <p className="card-extra">{extra}</p>
        )}
      </div>
    </div>
  );
}

export default PreventiveCard;
