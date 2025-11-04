import "./ApplicationRequirements.scss";
import Button from "../../../components/Button/Button";
import RightArrow from "/svgs/right-white-arrow.svg";
import { HashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";

function ApplicationRequirements() {
  const { language } = useParams();
  const currentLan = language || "ru";

  const text = {
    ru: {
      header: "Общие требования и условия",
      requirements:
        "Требования: Закончившиеся или учащиеся в резидентуре, работающие или стажеры, учащиеся или работающие в других странах.",
      workMode:
        "Режим работы: 6/7, с 8:00 до 5:00. Кандидаты рассматриваются на полный рабочий график.",
      deadline: "Подача резюме открыта до",
      date: "31 марта 2026",
      button: "Подать заявку",
    },
    en: {
      header: "General Requirements & Conditions",
      requirements:
        "Requirements: Completed or currently enrolled in a residency program. Working or interning in the medical field. Studying or working in other countries is also considered.",
      workMode:
        "Working hours: 6 days a week (Monday–Saturday), from 8:00 AM to 5:00 PM. Candidates will be considered for full-time positions.",
      deadline: "Applications are open until",
      date: "March 31, 2026",
      button: "Submit an application",
    },
  };

  return (
    <section className="ApplicationRequirements-container">
      <div className="ApplicationRequirements-header_container">
        <header className="ApplicationRequirements-header">
          <h4 className="text">{text[currentLan].header}</h4>
        </header>
      </div>

      <div className="ApplicationRequirements-content_container">
        <div className="content">
          <span className="highlight">
            {text[currentLan].requirements.split(":")[0]}:
          </span>{" "}
          {text[currentLan].requirements.split(":")[1]}
        </div>
        <div className="content">
          <span className="highlight">
            {text[currentLan].workMode.split(":")[0]}:
          </span>{" "}
          {text[currentLan].workMode.split(":")[1]}
        </div>
        <div className="deadline">
          {text[currentLan].deadline} <br /> {text[currentLan].date}
        </div>
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
            text={text[currentLan].button}
            imgSrc={RightArrow}
            variant="black"
          />
        </HashLink>
      </div>
    </section>
  );
}

export default ApplicationRequirements;
