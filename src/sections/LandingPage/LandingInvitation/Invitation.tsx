import "./Invitation.scss";
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
    <section className="invitation_container">
      <h2 className="header">{text[currentLan].header}</h2>
      <div className="details">
        <p className="detail detail1">{text[currentLan].detail1}</p>
        <p className="detail detail2">{text[currentLan].detail2}</p>
      </div>
    </section>
  );
}

export default InvitationSection;
