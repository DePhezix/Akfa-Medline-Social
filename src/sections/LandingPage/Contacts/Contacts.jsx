import "./Contacts.scss";
import PhoneSVG from "/svgs/phone.svg";
import MailSVG from "/svgs/mail.svg";
import LocationSVG from "/svgs/location.svg";
import { useParams } from 'react-router-dom'

function Contacts() {
  const { language } = useParams()
  const currentLan = language || 'ru'
  const ContactsList = {
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

  const selectedContacts = ContactsList[currentLan];

  return (
    <section className="ContactsContainer" id="contacts">
      <div className="contacts">
        <h2 className="contacts-header">
          {currentLan === "ru" ? "Контакты" : "Contacts"}
        </h2>
        <div className="contacts-list">
          {selectedContacts.map((contact, index) => (
            <a
              href={contact.link}
              key={index}
              className="contactContainer"
              target={index === 2 ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <figure className="icon-container">
                <img src={contact.imgSrc} alt="" className="icon" />
              </figure>
              <div className="text-container">
                <div className="contacts-headerContainer">
                  <h3 className="header">{contact.title}</h3>
                  {contact.text1 && (
                    <p className="subtitle">{contact.text1}</p>
                  )}
                </div>
                <p className="contact">{contact.text2}</p>
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
        className="maps"
        allowFullScreen
      />
    </section>
  );
}

export default Contacts;
