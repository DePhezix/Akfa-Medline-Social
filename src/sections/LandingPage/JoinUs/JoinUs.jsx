import "./JoinUs.scss";
import Card from "../../../components/Card/Card";
import Star from "/svgs/star.svg";
import Circles from "/svgs/2_circles.svg";
import Community from "/svgs/community.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import bckgrndImg from "/images/doctor_holding_stethoscope.jpg";
import Button from "../../../components/Button/Button";
import { HashLink } from 'react-router-hash-link'

function JoinUsSection() {
  const data = [
    {
      imgSrc: Star,
      title: "МИССИЯ",
      details:
        "Создавать рабочую среду, в которой врачи и медицинские специалисты могут реализовывать свой профессиональный потенциал, предоставляя пациентамдоступную и качественную медицинскую,",
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
  ];
  return (
    <div className="join-us_container">
      <div className="img-container">
        <div className="text-and-button-container">
          <div className="text">
            <div className="header">Хотите работать у нас?</div>
            <div className="subtitle">
              Заполните форму, чтобы заявить о своём интересе к работе в нашей
              клинике. Мы свяжемся с вами, как только начнётся активный этап
              набора.
            </div>
          </div>
          <HashLink
            smooth
            to="/#vacancies"
            className="button-container"
          >
            <Button
              text="Подать заявку"
              imgSrc={RightArrow}
              additionalStyle={{ borderRadius: "8px" }}
            />
          </HashLink>
        </div>
        <img src={bckgrndImg} alt="" className="dctr-img" />
      </div>
      <div className="join-us_cards-container">
        {data.map((arr, index) => (
          <Card
            key={index}
            imgSrc={arr.imgSrc}
            title={arr.title}
            details={arr.details}
          />
        ))}
      </div>
    </div>
  );
}

export default JoinUsSection;
