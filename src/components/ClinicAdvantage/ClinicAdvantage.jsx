import "./ClinicAdvtange.scss";

function ClinicAdvantage({ title, details, imgSrc, inverse }) {
  return (
    <div
      className={`ClinicAdvantage_container ${
        inverse ? " ClinicAdvantage_container--inverse" : ""
      }`}
    >
      <div className="ClinicAdvantage_text-container">
        <h4 className="ClinicAdvantage_title">{title}</h4>
        <p className="ClinicAdvantage_details">{details}</p>
      </div>
      <div className="ClinicAdvantage_img-container">
        <img className="ClinicAdvantage_img" src={imgSrc} />
      </div>
    </div>
  );
}

export default ClinicAdvantage;
