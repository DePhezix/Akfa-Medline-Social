import './Contacts.scss'


function Contacts() {
  const ContactsList = [
    {
      imgSrc: "/Akfa-Medline-Social/svgs/phone.svg",
      title: "Позвоните нам",
      text1: "Пн-Пт с 9:00 до 18:00.",
      text2: "+998 77 403-30-03",
    },
    {
      imgSrc: "/Akfa-Medline-Social/svgs/mail.svg",
      title: "Напишите нам",
      text1: "Круглосуточно, каждый день",
      text2: "hr.pm@akfamedline.uz",
    },
    {
      imgSrc: "/Akfa-Medline-Social/svgs/location.svg",
      title: "Мы рады видеть вас здесь",
      text1: "",
      text2:
        "Ташкент, Мирабадский район, махаллинский сход граждан Тонг Юлдузи ",
    },
  ];
  return (
    <div className="ContactsContainer" id="contacts">
      <div className="contacts">
        <div className="contacts-header">Контакты</div>
        <div className="contacts-list">
          {ContactsList.map((contact, index) => (
            <div className="contactContainer" key={index}>
              <div className="icon-container">
                <img src={contact.imgSrc} alt="" className="icon" />
              </div>
              <div className="text-container">
                <div className="contacts-headerContainer">
                  <div className="header">{contact.title}</div>
                  {contact.text1 && (
                    <div className="subtitle">{contact.text1}</div>
                  )}
                </div>
                <div className="contact">{contact.text2}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4179.3536135037575!2d69.42900458560892!3d41.329161966084264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef7002ad8c16d%3A0xa19673ebc50fa81c!2sCentral%20Asian%20University%20in%20Tashkent%20-%20CAU!5e0!3m2!1sen!2s!4v1761302410905!5m2!1sen!2s"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="maps"
      />
    </div>
  );
}

export default Contacts