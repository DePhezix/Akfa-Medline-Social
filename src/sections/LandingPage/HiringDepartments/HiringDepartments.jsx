import "./HiringDepartments.scss";
import DownArrow from "/Akfa-Medline-Social/svgs/downArrow.svg";
import { useState } from 'react'

function HiringDepartments() {
  const [departments, setDepartments] = useState([
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
  ]);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="HiringDepartmentsContainer">
      <div className="HiringDepartmentsContainer-header">
        Мы формируем лист ожидания кандидатов для следующих отделений:
      </div>

      <div className="HiringDepartmentsContainer-departmentsList">
        <div className={`departments ${showAll ? "show" : ""}`}>
          {departments.map((dept, i) => (
            <div key={i}>{dept}</div>
          ))}
        </div>

        <div className="see-more" onClick={() => setShowAll(!showAll)}>
          <div className="text">{showAll ? "Скрыть" : "Посмотреть все"}</div>
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
    </div>
  );
}

export default HiringDepartments;
