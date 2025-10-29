import "./Hero.scss";
import SurgeryImage from "../../../assets/images/surgery.jpg";

function Hero({ imgSrc = SurgeryImage, Heading, SubHeading }) {
  return (
    <div className="JobDetailsHeroContainer">
      <div
        className="hero-img-background"
        style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : ""}
      >
        <div className="textContainer">
          <div className="heading">
            <div className="main-heading">{Heading}</div>
            <div className="subheading">{SubHeading}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
