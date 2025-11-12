import "./ClinicAdvantages.scss";
import { useParams } from "react-router-dom";
import ClinicAdvantage from "../../../components/ClinicAdvantage/ClinicAdvantage.js";
import CAI1 from "/images/ClinicalAdvantageImage1.jpg";
import CAI2 from "/images/ClinicalAdvantageImage2.jpg";
import CAI3 from "/images/ClinicalAdvantageImage3.jpg";
import CAI4 from "/images/ClinicalAdvantageImage4.jpg";
import CAI5 from "/images/ClinicalAdvantageImage5.png";

type languagesType = "ru" | "en";

interface dataType {
  title: string;
  details: string;
  imgSrc: string;
  inverse: boolean;
}

interface textType {
  header: string;
  subtitle: string;
  data: dataType[];
}

function ClinicAdvantages() {
  const { language } = useParams<{ language: languagesType }>();
  const currentLan: languagesType = language || "ru";

  const text: Record<languagesType, textType> = {
    ru: {
      header: "Преимущества клиники",
      subtitle:
        "Наша клиника предоставляет уникальные возможности профессионального и личного роста для медицинского персонала. Мы заботимся о тех, кто заботится о других.",
      data: [
        {
          title: "Обучение за счёт клиники",
          details:
            "Поддержка повышения квалификации для врачей и медицинских сестёр без финансовой нагрузки для работника.",
          imgSrc: CAI1,
          inverse: false,
        },
        {
          title: "Участие в международных конференциях",
          details:
            "Мы открываем доступ к мировым медицинским событиям. Общение с лидерами индустрии и обмен опытом обеспечен.",
          imgSrc: CAI2,
          inverse: true,
        },
        {
          title: "Совместные проекты с ведущими организациями",
          details:
            "Сотрудничество с Akfa Medline, Central Asian University и другими лидерами индустрии. Работа в команде с передовыми специалистами и учёными.",
          imgSrc: CAI3,
          inverse: false,
        },
        {
          title: "Ежегодный бесплатный Check-up",
          details:
            "Полный медицинский осмотр для наших врачей и медсестёр – мы заботимся о вашем здоровье.",
          imgSrc: CAI4,
          inverse: true,
        },
        {
          title: "Специальные медицинские услуги для семей и близких",
          details:
            "Пакеты медуслуг для ваших близких. Поддержка и забота для всей семьи.",
          imgSrc: CAI5,
          inverse: false,
        },
      ],
    },
    en: {
      header: "Advantages of the clinic",
      subtitle:
        "Our clinic provides unique opportunities for professional and personal growth for medical staff. We care for those who care for others.",
      data: [
        {
          title: "Training at the expense of the clinic",
          details:
            "Support for advanced training for doctors and nurses without financial burden for the employee..",
          imgSrc: CAI1,
          inverse: false,
        },
        {
          title: "Participation in International Conferences",
          details:
            "We provide access to global medical events. Communication with industry leaders and exchange of experience is guaranteed.",
          imgSrc: CAI2,
          inverse: true,
        },
        {
          title: "Joint projects with leading organizations",
          details:
            "Collaboration with Akfa Medline, Central Asian University and other industry leaders. Teamwork with leading specialists and scientists..",
          imgSrc: CAI3,
          inverse: false,
        },
        {
          title: "Free Annual Check-up",
          details:
            "Complete medical examination for our doctors and nurses - we care about your health.",
          imgSrc: CAI4,
          inverse: true,
        },
        {
          title: "Special medical services for families and loved ones",
          details:
            "Medical packages for your loved ones. Support and care for the whole family.",
          imgSrc: CAI5,
          inverse: false,
        },
      ],
    },
  };

  return (
    <section className="ClinicAdvantages-container" id="benefits">
      <header className="ClinicAdvantages_header-container">
        <h2 className="ClinicAdvantages_header">{text[currentLan].header}</h2>
        <p className="ClinicAdvantages_subtitle">{text[currentLan].subtitle}</p>
      </header>
      <div className="ClinicalAdvantages_list-container">
        {text[currentLan].data.map((item, index) => (
          <ClinicAdvantage
            key={index}
            title={item.title}
            details={item.details}
            imgSrc={item.imgSrc}
            inverse={item.inverse}
          />
        ))}
      </div>
    </section>
  );
}

export default ClinicAdvantages;
