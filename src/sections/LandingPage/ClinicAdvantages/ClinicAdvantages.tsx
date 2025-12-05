import { useParams } from "react-router-dom";
import ClinicAdvantage from "../../../components/ClinicAdvantage/ClinicAdvantage.js";
import CAI1 from "/images/ClinicalAdvantageImage1.avif";
import CAI2 from "/images/ClinicalAdvantageImage2.avif";
import CAI3 from "/images/ClinicalAdvantageImage3.avif";
import CAI4 from "/images/ClinicalAdvantageImage4.avif";
import CAI5 from "/images/ClinicalAdvantageImage5.avif";
import { useRef } from "react";

import { fadeIn, useGSAP } from '../../../gsapConfig.js'

type languagesType = "ru" | "en";

interface dataType {
  title: string;
  details: string;
  imgSrc: string;
  inverse: boolean;
  imgAlt: string;
}

interface textType {
  header: string;
  subtitle: string;
  data: dataType[];
}

function ClinicAdvantages() {
  const { language } = useParams<{ language: languagesType }>();
  const currentLan: languagesType = language || "ru";

  const header = useRef<HTMLHeadElement | null>(null)

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
          imgAlt: "woman sitting with desk",
        },
        {
          title: "Участие в международных конференциях",
          details:
            "Мы открываем доступ к мировым медицинским событиям. Общение с лидерами индустрии и обмен опытом обеспечен.",
          imgSrc: CAI2,
          inverse: true,
          imgAlt: "speaker giving talk image",
        },
        {
          title: "Совместные проекты с ведущими организациями",
          details:
            "Сотрудничество с Akfa Medline, Central Asian University и другими лидерами индустрии. Работа в команде с передовыми специалистами и учёными.",
          imgSrc: CAI3,
          inverse: false,
          imgAlt: "members working together",
        },
        {
          title: "Ежегодный бесплатный Check-up",
          details:
            "Полный медицинский осмотр для наших врачей и медсестёр – мы заботимся о вашем здоровье.",
          imgSrc: CAI4,
          inverse: true,
          imgAlt: "doctor checking patient's health",
        },
        {
          title: "Специальные медицинские услуги для семей и близких",
          details:
            "Пакеты медуслуг для ваших близких. Поддержка и забота для всей семьи.",
          imgSrc: CAI5,
          inverse: false,
          imgAlt: "nurse checking patient",
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
          imgAlt: "woman sitting with desk",
        },
        {
          title: "Participation in International Conferences",
          details:
            "We provide access to global medical events. Communication with industry leaders and exchange of experience is guaranteed.",
          imgSrc: CAI2,
          inverse: true,
          imgAlt: "speaker giving talk image",
        },
        {
          title: "Joint projects with leading organizations",
          details:
            "Collaboration with Akfa Medline, Central Asian University and other industry leaders. Teamwork with leading specialists and scientists..",
          imgSrc: CAI3,
          inverse: false,
          imgAlt: "members working together",
        },
        {
          title: "Free Annual Check-up",
          details:
            "Complete medical examination for our doctors and nurses - we care about your health.",
          imgSrc: CAI4,
          inverse: true,
          imgAlt: "doctor checking patient's health",
        },
        {
          title: "Special medical services for families and loved ones",
          details:
            "Medical packages for your loved ones. Support and care for the whole family.",
          imgSrc: CAI5,
          inverse: false,
          imgAlt: "nurse checking patient",
        },
      ],
    },
  };

  useGSAP(() => {
    fadeIn(header)
  })

  return (
    <section
      className="max-2xl:w-full max-2xl:gap-[45px] flex flex-col w-[1280px] gap-[60px] mb-[80px]"
      id="benefits"
    >
      <header className="max-2xl:w-full flex flex-col gap-[16px] items-center" ref={header}>
        <h2 className="max-2xl:w-full max-2xl:font-[700] max-2xl:text-[32px] max-2xl:leading-[40px] max-2xl:h-min w-[628px] h-[44px] font-[700] text-[36px] tracking-[-1px] text-center align-middle ">
          {text[currentLan].header}
        </h2>
        <p className="max-2xl:text-[16px] max-2xl:leading-[24px] max-2xl:w-full max-2xl:h-min w-[628px] h-[90px] text-[20px] leading-[150%] tracking-[-1px] text-center align-middle">
          {text[currentLan].subtitle}
        </p>
      </header>
      <div className="max-2xl:flex-row max-2xl:overflow-x-auto max-2xl:overflow-y-hidden max-2xl:gap-[16px]] [&::-webkit-scrollbar]:hidden flex flex-col gap-[40px]">
        {text[currentLan].data.map((item, index) => (
          <ClinicAdvantage
            key={index}
            title={item.title}
            details={item.details}
            imgSrc={item.imgSrc}
            inverse={item.inverse}
            imgAlt={item.imgAlt}
          />
        ))}
      </div>
    </section>
  );
}

export default ClinicAdvantages;
