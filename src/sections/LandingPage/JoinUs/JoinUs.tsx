import Card from "../../../components/Card/Card.js";
import Button from "../../../components/Button/Button.js";
import Star from "/svgs/star.svg";
import Circles from "/svgs/2_circles.svg";
import Community from "/svgs/community.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import bckgrndImg from "/images/doctor_holding_stethoscope.avif";
import { HashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import { useRef } from 'react'
import { useGSAP, fadeIn } from '../../../gsapConfig.js'

type languagesType = "en" | "ru"

interface cardDataType {
  imgSrc: string;
  title: string;
  details: string;
  imgAlt?: string;
}

interface contentType {
  header: string;
  subtitle: string;
  button: string;
  cardsData: cardDataType[]
}

function JoinUsSection() {
    const { language } = useParams<{language: languagesType}>();
    const currentLan: languagesType = language || "ru";

    const textContainer = useRef<HTMLDivElement | null>(null)
    const cardsContainer = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
      fadeIn(textContainer);
      fadeIn(cardsContainer)
    })

  const content: Record<languagesType, contentType> = {
    ru: {
      header: "Хотите работать у нас?",
      subtitle:
        "Заполните форму, чтобы заявить о своём интересе к работе в нашей клинике. Мы свяжемся с вами, как только начнётся активный этап набора.",
      button: "Подать заявку",
      cardsData: [
        {
          imgSrc: Star,
          title: "МИССИЯ",
          details:
            "Создавать рабочую среду, в которой врачи и медицинские специалисты могут реализовывать свой профессиональный потенциал, предоставляя пациентам доступную и качественную медицинскую помощь.",
          imgAlt: "star icon",
        },
        {
          imgSrc: Circles,
          title: "ВИДЕНИЕ",
          details:
            "Быть клиникой, в которой приятно и престижно работать, где каждый специалист чувствует поддержку, ценность своего труда и возможность профессионального роста. Мы стремимся стать ведущим медицинским учреждением региона не только по качеству лечения, но и по уровню командной культуры.",
          imgAlt: "circles icon",
        },
        {
          imgSrc: Community,
          title: "ЦЕННОСТИ",
          details:
            "Мы строим команду на основе взаимного уважения, сотрудничества и профессионализма. Для нас важно, чтобы каждый сотрудник чувствовал поддержку, ценность своего труда и возможность расти. Мы поощряем инициативу, открыты к новым идеям и верим, что забота о пациентах начинается с заботы друг о друге.",
          imgAlt: "community icon",
        },
      ],
    },
    en: {
      header: "Do you want to work for us?",
      subtitle:
        "Please fill out the form to express your interest in working at our clinic. We will contact you as soon as the active recruitment phase begins.",
      button: "Submit an application",
      cardsData: [
        {
          imgSrc: Star,
          title: "MISSION",
          details:
            "To create a work environment in which physicians and health care professionals can realize their professional potential by providing patients with affordable and high-quality medical care.",
          imgAlt: "star icon",
        },
        {
          imgSrc: Circles,
          title: "VISION",
          details:
            "To become a clinic where it is both pleasant and prestigious to work — a place where every specialist feels supported, understands the value of their work, and has opportunities for continuous professional growth. We strive to be the leading medical institution in the region, recognized not only for the quality of care, but also for the strength of our team culture",
          imgAlt: "vision icon",
        },
        {
          imgSrc: Community,
          title: "VALUES",
          details:
            "We are building a team founded on mutual respect, collaboration, and professionalism. We believe it is essential that every team member feels supported, that their work is valued, and that they have opportunities for continuous growth. We encourage initiative, welcome new ideas, and believe that truly caring for patients begins with caring for one another.",
          imgAlt: "community icon",
        },
      ],
    },
  };


  return (
    <section className="max-2xl:min-[1245px]:items-center max-2xl:w-full max-2xl:overflow-x-hidden max-2xl:bg-center flex w-[1280px] flex-col gap-[60px] mb-[60px]">
      <div className="max-2xl:w-full max-md:flex max-md:items-end max-md:justify-center max-md:w-full max-md:rounded-[12px] max-md:p-[16px] max-md:pt-[24px] max-md:pb-[24px] max-md:h-[526px] w-[1280px] h-[685px] relative text-white">
        <div className="max-md:static flex flex-col w-[617px] absolute top-[308px] left-[60px] gap-[32px] z-10" ref={textContainer}>
          <header className="flex flex-col gap-[16px]">
            <h2 className="max-md:text-[32px] max-md:leading-[40px] max-md:h-min max-md:w-full max-md:mb-28px w-[473px] h-[135px] text-[56px] leading-[67.2px] tracking-[-1px] font-[400]">{content[currentLan].header}</h2>
            <p className="max-md:leading-[1.75rem] max-md:text-[1.25rem] max-md:w-full max-md:font-[500]  font-[500] text-[20px] leading-[150%] tracking-[-0.5px] w-[498px]">{content[currentLan].subtitle}</p>
          </header>
          <HashLink
            smooth
            to={
              currentLan === "ru"
                ? "/Akfa-Medline-Social/#vacancies"
                : `/Akfa-Medline-Social/${currentLan}#vacancies`
            }
            className="max-md:w-full w-max rounded-[7px] no-underline"
          >
            <Button
              text={content[currentLan].button}
              imgSrc={RightArrow}
              imgAlt='right arrow'
              additionalStyle={{ borderRadius: "8px" }}
            />
          </HashLink>
        </div>
        <img
          src={bckgrndImg}
          alt="Doctor holding stethoscope"
          className="max-2xl:w-full max-2xl:object-cover max-md:h-[526px] w-[1280px] h-[685px] rounded-[5px] absolute top-[0] left-[0]"
        />
      </div>

      <div className="max-2xl:flex-wrap flex justify-between gap-[11.5px]" ref={cardsContainer}>
        {content[currentLan].cardsData.map((arr, index) => (
          <Card
            key={index}
            imgSrc={arr.imgSrc}
            title={arr.title}
            details={arr.details}
          />
        ))}
      </div>
    </section>
  );
}

export default JoinUsSection;
