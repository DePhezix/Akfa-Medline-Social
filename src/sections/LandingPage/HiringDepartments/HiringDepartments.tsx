import DownArrow from "/svgs/downArrow.svg";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGSAP, fadeIn } from "../../../gsapConfig.js";

type languagesType = "en" | "ru"

function HiringDepartments() {
  const { language } = useParams<{language: languagesType}>();
  const currentLan: languagesType = language || "ru";

  const container = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    fadeIn(container)
  })

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
    <section className="max-2xl:w-full max-md:flex-col max-md:gap-[20px] flex w-[1280px] rounded-[12px] pl-[3px] pr-[3px] gap-[42px] mb-[80px] text-black" ref={container}>
      <h3 className="max-2xl:w-full max-2xl:text-[32px]  max-md:leading-[40px] max-md:font-[700] font-[600] text-[36px] leading-[140%] tracking-[-1px] align-middle w-[598px]">
        {text[currentLan].header}
      </h3>

      <div className="flex-1 max-2xl:w-full max-md:h-min flex flex-col bg-[#f3f4f4] rounded-[12px] p-[24px] gap-[10px] h-min">
        <div className={`max-2xl:w-full max-2xl:text-[18px] w-586px font-[500] text-[20px] leading-[180%] tracking-[-1px]] align-middle h-[144px] overflow-hidden transition duration-300 ease-linear ${showAll ? "h-auto" : ""}`}>
          {departmentsData[currentLan].map((dept, i) => (
            <div key={i}>{dept}</div>
          ))}
        </div>

        <div className="max-2xl:flex max-2xl:items-center flex gap-[10px] cursor-pointer" onClick={() => setShowAll(!showAll)}>
          <p className="max-2xl:text-[18px] font-[600] text-[20px] tracking-[-0.5px] align-middle">
            {showAll ? text[currentLan].hide : text[currentLan].seeMore}
          </p>
          <img
            src={DownArrow}
            alt="down arrow"
            className={`max-2xl:w-[18px] max-2xl:h-[18px] transition duration-300 ${showAll ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
      </div>
    </section>
  );
}

export default HiringDepartments;
