import "./Hero.scss";
import VacanciesImg from "/images/vacancies.avif";
import ClockSVG from '/svgs/clock.svg'

type Props = {
  imgSrc?: string,
  Heading: string,
  SubHeading: string,
  CandidatesNumber: number,
  Salary: string
}

function Hero({ imgSrc = VacanciesImg, Heading, SubHeading, CandidatesNumber, Salary }: Props) {
  return (
    <main className="JobDetailsHeroContainer">
      <div
        className="hero-img-background"
        style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : {}}
      >
        <div className="textContainer">
          <div className="heading">
            <h3 className="subheading">{SubHeading}</h3>
            <h1 className="main-heading">{Heading}</h1>
            <h3 className="subheading-2">{Salary} UZS/year</h3>
            <div className="candidatesWrapper">
              <img src={ClockSVG} alt="" className="clock" />
              <p className="text">
                Candidates on the waiting list: <span>{CandidatesNumber}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
