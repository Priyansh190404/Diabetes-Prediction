import "./Preventive.css";

function PreventiveCard({ item }) {
  return (
    <div className="modern-card">
      <img src={item.image} alt={item.title} />

      <div className="modern-card-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default PreventiveCard;