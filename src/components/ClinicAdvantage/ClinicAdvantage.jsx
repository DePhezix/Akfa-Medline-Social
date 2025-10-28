import './ClinicAdvtange.scss'

function ClinicAdvantage({title, details, imgSrc, inverse}) {
    return (
      <div className={`ClinicAdvantage_container ${inverse ? ' ClinicAdvantage_container--inverse' : ''}`}>
        <div className="ClinicAdvantage_text-container">
          <div className="ClinicAdvantage_title">{title}</div>
          <div className="ClinicAdvantage_details">{details}</div>
        </div>
        <img className="ClinicAdvantage_img" src={imgSrc} />
      </div>
    );
}

export default ClinicAdvantage