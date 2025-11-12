import "./JoinUs.scss";
import Card from "../../../components/Card/Card.js";
import Button from "../../../components/Button/Button.js";
import Star from "/svgs/star.svg";
import Circles from "/svgs/2_circles.svg";
import Community from "/svgs/community.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import bckgrndImg from "/images/doctor_holding_stethoscope.jpg";
import { HashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";

type languagesType = "en" | "ru"

interface cardDataType {
  imgSrc: string;
  title: string;
  details: string;
}

interface contentType {
  header: string;
  subtitle: string;
  button: string;
  cardsData: cardDataType[]
}

function JoinUsSection() {
    const { language } = useParams<{language: languagesType}>();
    const currentLan: languagesType = language || "ru";

  const content: Record<languagesType, contentType> = {
    ru: {
      header: "Хотите работать у нас?",
      subtitle:
        "Заполните форму, чтобы заявить о своём интересе к работе в нашей клинике. Мы свяжемся с вами, как только начнётся активный этап набора.",
      button: "Подать заявку",
      cardsData: [
        {
          imgSrc: Star,
          title: "МИССИЯ",
          details:
            "Создавать рабочую среду, в которой врачи и медицинские специалисты могут реализовывать свой профессиональный потенциал, предоставляя пациентам доступную и качественную медицинскую помощь.",
        },
        {
          imgSrc: Circles,
          title: "ВИДЕНИЕ",
          details:
            "Быть клиникой, в которой приятно и престижно работать, где каждый специалист чувствует поддержку, ценность своего труда и возможность профессионального роста. Мы стремимся стать ведущим медицинским учреждением региона не только по качеству лечения, но и по уровню командной культуры.",
        },
        {
          imgSrc: Community,
          title: "ЦЕННОСТИ",
          details:
            "Мы строим команду на основе взаимного уважения, сотрудничества и профессионализма. Для нас важно, чтобы каждый сотрудник чувствовал поддержку, ценность своего труда и возможность расти. Мы поощряем инициативу, открыты к новым идеям и верим, что забота о пациентах начинается с заботы друг о друге.",
        },
      ],
    },
    en: {
      header: "Do you want to work for us?",
      subtitle:
        "Please fill out the form to express your interest in working at our clinic. We will contact you as soon as the active recruitment phase begins.",
      button: "Submit an application",
      cardsData: [
        {
          imgSrc: Star,
          title: "MISSION",
          details:
            "To create a work environment in which physicians and health care professionals can realize their professional potential by providing patients with affordable and high-quality medical care.",
        },
        {
          imgSrc: Circles,
          title: "VISION",
          details:
            "To become a clinic where it is both pleasant and prestigious to work — a place where every specialist feels supported, understands the value of their work, and has opportunities for continuous professional growth. We strive to be the leading medical institution in the region, recognized not only for the quality of care, but also for the strength of our team culture",
        },
        {
          imgSrc: Community,
          title: "VALUES",
          details:
          "We are building a team founded on mutual respect, collaboration, and professionalism. We believe it is essential that every team member feels supported, that their work is valued, and that they have opportunities for continuous growth. We encourage initiative, welcome new ideas, and believe that truly caring for patients begins with caring for one another.",
        },
      ],
    },
  };


  return (
    <section className="join-us_container">
      <div className="img-container">
        <div className="text-and-button-container">
          <header className="text">
            <h2 className="header">{content[currentLan].header}</h2>
            <h5 className="subtitle">{content[currentLan].subtitle}</h5>
          </header>
          <HashLink
            smooth
            to={
              currentLan === "ru"
                ? "/Akfa-Medline-Social/#vacancies"
                : `/Akfa-Medline-Social/${currentLan}#vacancies`
            }
            className="button-container"
          >
            <Button
              text={content[currentLan].button}
              imgSrc={RightArrow}
              additionalStyle={{ borderRadius: "8px" }}
            />
          </HashLink>
        </div>
        <img
          src={bckgrndImg}
          alt="Doctor holding stethoscope"
          className="dctr-img"
        />
      </div>

      <div className="join-us_cards-container">
        {content[currentLan].cardsData.map((arr, index) => (
          <Card
            key={index}
            imgSrc={arr.imgSrc}
            title={arr.title}
            details={arr.details}
          />
        ))}
      </div>
    </section>
  );
}

export default JoinUsSection;
