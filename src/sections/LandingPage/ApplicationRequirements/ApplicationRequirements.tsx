import "./ApplicationRequirements.scss";
import Button from "../../../components/Button/Button.js";
import RightArrow from "/svgs/right-white-arrow.svg";
import { HashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";

interface textType {
  header: string;
  requirements: string;
  workMode: string;
  deadline: string;
  date: string;
  button: string;
}

type languagesType = "ru" | "en";

const text: Record<languagesType, textType> = {
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

function ApplicationRequirements() {
  const { language } = useParams<{language: languagesType}>();
  const currentLan: languagesType = language || "ru";
  const currentText: textType = text[currentLan];

  return (
    <section className="ApplicationRequirements-container">
      <div className="ApplicationRequirements-header_container">
        <header className="ApplicationRequirements-header">
          <h4 className="text">{currentText.header}</h4>
        </header>
      </div>

      <div className="ApplicationRequirements-content_container">
        <div className="content">
          <span className="highlight">
            {currentText.requirements.split(":")[0]}:
          </span>{" "}
          {currentText.requirements.split(":")[1]}
        </div>
        <div className="content">
          <span className="highlight">
            {currentText.workMode.split(":")[0]}:
          </span>{" "}
          {currentText.workMode.split(":")[1]}
        </div>
        <div className="deadline">
          {currentText.deadline} <br /> {currentText.date}
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
            text={currentText.button}
            imgSrc={RightArrow}
            variant="black"
          />
        </HashLink>
      </div>
    </section>
  );
}

export default ApplicationRequirements;
