import "./Hero.scss";
import VacanciesImg from "/images/vacancies.avif";

function Hero({ imgSrc = VacanciesImg, Heading, SubHeading }) {
  return (
    <div className="JobDetailsHeroContainer">
      <div
        className="hero-img-background"
        style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : ""}
      >
        <div className="textContainer">
          <div className="heading">
            <h3 className="subheading">{SubHeading}</h3>
            <h1 className="main-heading">{Heading}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
