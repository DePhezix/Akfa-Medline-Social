import "./HiringDepartments.scss";
import DownArrow from "/svgs/downArrow.svg";
import { useState } from "react";
import { useParams } from "react-router-dom";

type languagesType = "en" | "ru"

function HiringDepartments() {
  const { language } = useParams<{language: languagesType}>();
  const currentLan: languagesType = language || "ru";

  const departmentsData: Record<languagesType, string[]> = {
    ru: [
      "Отделение Офтальмологии",
      "Отделение Гастроэнтерологии",
      "Отделение Неврологии",
      "Отделение Детской неврологии",
      "Отделение Нейрохирургии",
      "Отделение Детской Нейрохирургии",
      "Отделение Кардиологии",
      "Отделение Гинекологии",
      "Отделение Оториноларингологии",
      "Терапевтическое Отделение",
      "Отделение Педиатрии",
      "Отделение Эндокринологии",
      "Отделение Общей хирургии",
      "Отделение Урологии",
      "Отделение Дерматологии",
      "Отделение Ревматологии",
      "Отделение Травматологии",
      "Отделение Детской ортопедии",
      "Отделение Онкологии",
      "Отделение Физиотерапевт-реабилитологии",
      "Отделение Психологии",
      "Отделение Пульмонологии",
      "Отделение Инфекционной Патологии",
      "Отделение Репродуктологии",
      "Отделение Пластической хирургии",
      "Отделение Анестезиологии",
      "Отделение Нефрологии",
      "Отделение Сосудистой Хирургии",
    ],
    en: [
      "Ophthalmology Department",
      "Gastroenterology Department",
      "Neurology Department",
      "Pediatric Neurology Department",
      "Neurosurgery Department",
      "Pediatric Neurosurgery Department",
      "Cardiology Department",
      "Gynecology Department",
      "Otorhinolaryngology Department",
      "Therapeutic Department",
      "Pediatrics Department",
      "Endocrinology Department",
      "General Surgery Department",
      "Urology Department",
      "Dermatology Department",
      "Rheumatology Department",
      "Traumatology Department",
      "Pediatric Orthopedics Department",
      "Oncology Department",
      "Physiotherapy and Rehabilitation Department",
      "Psychology Department",
      "Pulmonology Department",
      "Infectious Diseases Department",
      "Reproductology Department",
      "Plastic Surgery Department",
      "Anesthesiology Department",
      "Nephrology Department",
      "Vascular Surgery Department",
    ],
  };

  const [showAll, setShowAll] = useState(false);

  const text = {
    ru: {
      header: "Мы формируем лист ожидания кандидатов для следующих отделений:",
      seeMore: "Посмотреть все",
      hide: "Скрыть",
    },
    en: {
      header:
        "We are creating a waiting list of candidates for the following departments:",
      seeMore: "Show all",
      hide: "Hide",
    },
  };

  return (
    <section className="HiringDepartmentsContainer">
      <h3 className="HiringDepartmentsContainer-header">
        {text[currentLan].header}
      </h3>

      <div className="HiringDepartmentsContainer-departmentsList">
        <div className={`departments ${showAll ? "show" : ""}`}>
          {departmentsData[currentLan].map((dept, i) => (
            <div key={i}>{dept}</div>
          ))}
        </div>

        <div className="see-more" onClick={() => setShowAll(!showAll)}>
          <p className="text">
            {showAll ? text[currentLan].hide : text[currentLan].seeMore}
          </p>
          <img
            src={DownArrow}
            alt="down arrow"
            style={{
              transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default HiringDepartments;
