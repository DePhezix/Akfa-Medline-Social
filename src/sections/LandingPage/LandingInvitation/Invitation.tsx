import { useParams } from "react-router-dom";

type languagesType = "en" | "ru";

interface textType {
  header: string;
  detail1: string;
  detail2: string;
}

function InvitationSection() {
  const { language } = useParams<{ language: languagesType }>();
  const currentLan: languagesType = language || "ru";

  const text: Record<languagesType, textType> = {
    ru: {
      header: "Приглашаем врачей и медицинских специалистов в нашу команду!",
      detail1:
        "Наша клиника находится на этапе активного строительства и подготовки к запуску. Мы создаём современное медицинское учреждение, ориентированное на качество, безопасность и уважение к пациенту. Уже сегодня мы начинаем формировать лист ожидания кандидатов, которые хотят стать частью новой сильной команды с нуля.",
      detail2:
        "Мы приглашаем к сотрудничеству врачей различных специальностей, а также медицинских специалистов, разделяющих ценности ответственности, развития и командной работы. Это отличная возможность — войти в проект на раннем этапе и вместе с нами выстраивать клинику будущего.",
    },
    en: {
      header: "We invite doctors and medical specialists to join our team!",
      detail1:
        "Our clinic is under active construction and preparation for launch. We are creating a modern medical institution focused on quality, safety and patient-centered care. Today we are already starting to form a waiting list of candidates who want to become part of a new strong team from scratch.",
      detail2:
        "We invite doctors of various specialties to cooperate, as well as medical specialists who share the values ​​of responsibility, development and teamwork. This is an excellent opportunity to join the project at an early stage and build the clinic of the future together with us.",
    },
  };

  return (
    <section className="max-2xl:w-full flex flex-col gap-[24px] w-[1280px] text-black mt-[80px] mb-[80px]">
      <h2 className="max-2xl:w-full max-2xl:h-min max-md:leading-[40px] w-[628px] h-[96px] font-[700] text-[32px] leading-[150%] tracking-[-1px]">{text[currentLan].header}</h2>
      <div className="max-2xl:justify-between max-md:flex-col flex gap-[24px] font-[400] text-[20px] leading-[150%] tracking-[-1px]">
        <p className="max-2xl:h-min max-md:w-full max-md:text-[16px] max-md:leading-[25px] w-[628px] h-[180px]">{text[currentLan].detail1}</p>
        <p className="max-2xl:h-min max-md:w-full max-md:text-[16px] max-md:leading-[25px] w-[628px] h-[180px]">{text[currentLan].detail2}</p>
      </div>
    </section>
  );
}

export default InvitationSection;
