import "./Footer.scss";
import TelegramLogo from "/svgs/footer_telegram-logo.svg";
import FacebookLogo from "/svgs/footer_facebook-logo.svg";
import LinkedinLogo from "/svgs/footer_linkedin-logo.svg";
import FooterLogo from "/svgs/footer_logo.svg";
import { useLocation } from 'react-router-dom'

type SocialLink = {
  icon: string;
  alt: string;
  url: string;
};

function Footer() {
    const { pathname } = useLocation();

  const currentLan = pathname.includes("/en") ? "en" : "ru";
  const socialLinks: SocialLink[] = [
    {
      icon: TelegramLogo,
      alt: "Telegram",
      url: "https://t.me/akfamedline", 
    },
    {
      icon: FacebookLogo,
      alt: "Facebook",
      url: "https://www.facebook.com/akfamedline",
    },
    {
      icon: LinkedinLogo,
      alt: "LinkedIn",
      url: "https://www.linkedin.com/company/akfamedline",
    },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-container-2">
        <div className="footer_content">
          <div className="footer_title_and_logo">
            <div className="footer_title">
              <img
                src={FooterLogo}
                className="footer_logo"
                alt="Akfa Medline"
              />
              <div className="footer_contact-details">
                Phone: <a href="tel:+998774033003">+998-77-403-30-03</a> <br />
                Email:{" "}
                <a href="mailto:hr.pm@akfamedline.uz">hr.pm@akfamedline.uz</a>
              </div>
            </div>

            <div className="footer_social-icon-list">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer_social-media"
                >
                  <img
                    src={social.icon}
                    alt={social.alt}
                    className="footer_social-media_icon"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-list-wrapper">
            <div className="footer-address_container">
              <div className="footer-address">
                {currentLan === 'ru' ? 'Ташкент, Мирабадский район, махаллинский сход граждан Тонг Юлдузи' : 'Tashkent, Mirabad district, Tong Yulduz community council'}
                
              </div>
            </div>
          </div>
        </div>

        <div className="footer_copyright_block-wrapper">
          <div className="footer_copywrite-text">
            Copyright 2024 Social Akfa Medline. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
