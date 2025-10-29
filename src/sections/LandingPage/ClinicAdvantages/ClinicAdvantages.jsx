import "./ClinicAdvantages.scss";
import ClinicAdvantage from "../../../components/ClinicAdvantage/ClinicAdvantage";
import CAI1 from "../../../assets/images/ClinicalAdvantageImage1.jpg";
import CAI2 from '../../../assets/images/ClinicalAdvantageImage2.jpg';
import CAI3 from "../../../assets/images/ClinicalAdvantageImage3.jpg";
import CAI4 from "../../../assets/images/ClinicalAdvantageImage4.jpg";
import CAI5 from "../../../assets/images/ClinicalAdvantageImage5.png";

function ClinicAdvantages() {
  const data = [
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
  ];
  return (
    <div className="ClinicAdvantages-container" id="benefits">
      <div className="ClinicAdvantages_header-container">
        <div className="ClinicAdvantages_header">Преимущества клиники</div>
        <div className="ClinicAdvantages_subtitle">
          Наша клиника предоставляет уникальные возможности профессионального и
          личного роста для медицинского персонала. Мы заботимся о тех, кто
          заботится о других.
        </div>
      </div>
      <div className="ClinicalAdvantages_list-container">
        {data.map((datum, index) => (
          <ClinicAdvantage
            key={index}
            title={datum.title}
            details={datum.details}
            imgSrc={datum.imgSrc}
            inverse={datum.inverse}
          />
        ))}
      </div>
    </div>
  );
}

export default ClinicAdvantages;
