import "./InfoCard.scss";

const InfoCard = ({ icon, title, content, className }: any) => {
  return (
    <div className={`commn-bg info-card ${className}`}>
      <div className="info-card__icon">
        <img src={icon} alt="icon" />
      </div>
      <div className="info-card__text">
        <p>{title}</p>
        <h3>{content}</h3>
      </div>
    </div>
  );
};

export default InfoCard;
