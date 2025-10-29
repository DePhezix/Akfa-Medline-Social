import "./Footer.scss";
import TelegramLogo from "/svgs/footer_telegram-logo.svg";
import FacebookLogo from "/svgs/footer_facebook-logo.svg";
import LinkedinLogo from "/svgs/footer_linkedin-logo.svg";
import FooterLogo from "/svgs/footer_logo.svg";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-container-2">
        <div className="footer_content">
          <div className="footer_title_and_logo">
            <div className="footer_title">
              <img src={FooterLogo} className="footer_logo" />
              <div className="footer_contact-details">
                Phone: +998-77-403-30-03 <br /> Email: hr.pm@akfamedline.uz
              </div>
            </div>
            <div className="footer_social-icon-list">
              <div className="footer_social-media">
                <img src={TelegramLogo} className="footer_social-media_icon" />
              </div>
              <div className="footer_social-media">
                <img src={FacebookLogo} className="footer_social-media_icon" />
              </div>
              <div className="footer_social-media">
                <img src={LinkedinLogo} className="footer_social-media_icon" />
              </div>
            </div>
          </div>
          <div className="footer-list-wrapper">
            {/* <div className="footer-list_1"></div>
            <div className="footer-list_2"></div> */}
            <div className="footer-address_container">
              <div className="footer-address">
                Ташкент, Мирабадский район, махаллинский сход граждан Тонг
                Юлдузи
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
    </div>
  );
}

export default Footer;
