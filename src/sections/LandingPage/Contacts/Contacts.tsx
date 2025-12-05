import PhoneSVG from "/svgs/phone.svg";
import MailSVG from "/svgs/mail.svg";
import LocationSVG from "/svgs/location.svg";
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { fadeIn, useGSAP } from '../../../gsapConfig.js'

type languagesType = "ru" | "en"

interface contactsListType {
  imgSrc: string;
  title: string;
  text1: string;
  text2: string;
  link: string;
}

function Contacts() {
  const { language } = useParams<{ language: languagesType }>();
  const currentLan: languagesType = language || "ru";
  const ContactsList: Record<languagesType, contactsListType[]> = {
    ru: [
      {
        imgSrc: PhoneSVG,
        title: "Позвоните нам",
        text1: "Пн-Пт с 9:00 до 18:00.",
        text2: "+998 77 403-30-03",
        link: "tel:+998774033003",
      },
      {
        imgSrc: MailSVG,
        title: "Напишите нам",
        text1: "Круглосуточно, каждый день",
        text2: "hr.pm@akfamedline.uz",
        link: "mailto:hr.pm@akfamedline.uz",
      },
      {
        imgSrc: LocationSVG,
        title: "Мы рады видеть вас здесь",
        text1: "",
        text2:
          "Ташкент, Мирабадский район, махаллинский сход граждан Тонг Юлдузи",
        link:
          "https://maps.google.com/?q=Ташкент, Мирабадский район, махаллинский сход граждан Тонг Юлдузи",
      },
    ],
    en: [
      {
        imgSrc: PhoneSVG,
        title: "Call Us",
        text1: "Mon–Fri, from 9:00 to 18:00",
        text2: "+998 77 403-30-03",
        link: "tel:+998774033003",
      },
      {
        imgSrc: MailSVG,
        title: "Email Us",
        text1: "Available 24/7, every day",
        text2: "hr.pm@akfamedline.uz",
        link: "mailto:hr.pm@akfamedline.uz",
      },
      {
        imgSrc: LocationSVG,
        title: "We’re glad to see you here",
        text1: "",
        text2:
          "Tashkent, Mirabad District, Ton Yulduzi Citizens’ Gathering Area",
        link:
          "https://maps.google.com/?q=Tashkent, Mirabad District, Ton Yulduzi Citizens’ Gathering Area",
      },
    ],
  };

  const selectedContacts: contactsListType[] = ContactsList[currentLan];

  const heading = useRef<HTMLHeadingElement | null>(null)
  const contactsContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<HTMLIFrameElement | null>(null)

  useGSAP(() => {
    fadeIn(heading)
    fadeIn(contactsContainer)
    fadeIn(map)
  })

  return (
    <section
      className="flex flex-col w-[1280px] gap-[43px] mb-[80px] max-2xl:w-full"
      id="contacts"
    >
      <div className="flex w-full flex-col gap-[42px]">
        <h2 className="max-2xl:text-[32px] max-2xl:leading-[40px] max-2xl:font-[700] text-[56px]" ref={heading}>
          {currentLan === "ru" ? "Контакты" : "Contacts"}
        </h2>
        <div className="flex gap-[24px] flex-wrap" ref={contactsContainer}>
          {selectedContacts.map((contact, index) => (
            <a
              href={contact.link}
              key={index}
              className="max-2xl:p-[20px] flex flex-col flex-1 rounded-[16px] p-[32px] gap-[40px] border border-solid border-[rgba(82,82,90,0.2)] min-w-[280px] cursor-pointer no-underline text-black"
              target={index === 2 ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <figure className="w-[40px] h-[40px] rounded-[8px] bg-red flex justify-center items-center">
                <img src={contact.imgSrc} alt="" className="icon" />
              </figure>
              <div className="flex flex-col gap-[19px]">
                <div className="flex flex-col gap-[7.09px]">
                  <h3 className="font-[600] text-[21px] leading-[33.6px] tracking-[-0.5px]">
                    {contact.title}
                  </h3>
                  {contact.text1 && (
                    <p className="text-[16px] leading-[27.2px] text-[#232f3a] whitespace-nowrap">
                      {contact.text1}
                    </p>
                  )}
                </div>
                <p className="font-[500] text-[17px] leading-[27.2px] tracking-[-0.5px]">
                  {contact.text2}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <iframe
        src={
          currentLan === "ru"
            ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0983633047304!2d69.4282954!3d41.3284744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef7002ad8c16d%3A0xa19673ebc50fa81c!2sCentral%20Asian%20University%20in%20Tashkent%20-%20CAU!5e0!3m2!1sru!2s!4v1761909660717!5m2!1sru!2s"
            : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4179.3536135037575!2d69.42900458560892!3d41.329161966084264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef7002ad8c16d%3A0xa19673ebc50fa81c!2sCentral%20Asian%20University%20in%20Tashkent%20-%20CAU!5e0!3m2!1sen!2s!4v1761302410905!5m2!1sen!2s"
        }
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="max-2xl:w-full max-md:h-[440px] max-sm:h-[358px] w-[1280px] h-[550px] border-0 rounded-[10px]"
        allowFullScreen
        ref={map}
      />
    </section>
  );
}

export default Contacts;
