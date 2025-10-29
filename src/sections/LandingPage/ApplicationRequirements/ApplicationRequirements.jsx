import "./ApplicationRequirements.scss";
import Button from "../../../components/Button/Button";
import RightArrow from "/Akfa-Medline-Social/svgs/right-white-arrow.svg";
import { HashLink } from 'react-router-hash-link'

function ApplicationRequirements() {
  return (
    <div className="ApplicationRequirements-container">
      <div className="ApplicationRequirements-header_container">
        <div className="ApplicationRequirements-header">
          <div className="text">Общие требования и условия</div>
        </div>
      </div>
      <div className="ApplicationRequirements-content_container">
        <div className="content">
          <span className="highlight">Требования:</span> Закончившиеся или
          учащиеся в резидентуре, работающие или стажеры, учащиеся или
          работающие в других странах.
        </div>
        <div className="content">
          <span className="highlight">Режим работы: </span>  6/7, с 8:00 до
          5:00. Кандидаты рассматриваются на полный рабочий график.
        </div>
        <div className="deadline">
          Подача резюме открыта до <br /> 31 марта 2026
        </div>
        <HashLink
          smooth
          to="/Akfa-Medline-Social/#vacancies"
          className="button-container"
        >
          <Button text="Подать заявку" imgSrc={RightArrow} variant="black" />
        </HashLink>
      </div>
    </div>
  );
}

export default ApplicationRequirements;
