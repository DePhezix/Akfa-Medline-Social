import { useState, useContext } from "react";
import "./Header.scss";
import Logo from "/svgs/header_logo.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import DownArrow from "/svgs/downArrow.svg";
import { HashLink } from "react-router-hash-link";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/Button/Button.js";
import { PopUpContext } from "../../../contexts/PopupContext.js";

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { setIsPopUpOpen } = useContext(PopUpContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentLan = pathname.includes("/en") ? "en" : "ru";
  const basePath = pathname.replace("/en", "");

  const toggleMenu = () => {
    setIsHamburgerOpen((prev) => !prev);
    setIsPopUpOpen((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsHamburgerOpen(false);
    setIsPopUpOpen(false);
  };

  const handleLanguage = (lan: string) => {
    const newPath =
      lan === "ru"
        ? basePath
        : basePath.startsWith("/Akfa-Medline-Social/en")
        ? basePath
        : `/Akfa-Medline-Social/en${basePath.replace(
            "/Akfa-Medline-Social",
            ""
          )}`;

    navigate(newPath);
    handleNavClick();
  };

  return (
    <nav className="header-container">
      <Link
        to={
          currentLan === "ru"
            ? `/Akfa-Medline-Social/`
            : `/Akfa-Medline-Social/${currentLan}`
        }
        className="header-container_logo"
      >
        <img src={Logo} alt="Logo" />
      </Link>

      <div className="header-container_text">
        <HashLink
          smooth
          to={`/Akfa-Medline-Social/${
            currentLan !== "ru" ? currentLan : ""
          }#contacts`}
          className="navlink"
        >
          {currentLan === "ru" ? "Связаться с нами" : "Contact us"}
        </HashLink>

        <div className="header-container_language-container">
          <div className="header-container_language_background">
            <div className="header-container_language-container_2">
              <select
                className="header-container_language"
                onChange={(e) => handleLanguage(e.target.value)}
                value={currentLan}
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`header-container_hamburger ${
          isHamburgerOpen ? "open" : ""
        }`}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </div>

      <div className={`mobile-menu ${isHamburgerOpen ? "show" : ""}`}>
        <div className="menu">
          <div className="mobile_nav">
            <HashLink
              smooth
              to={`${basePath}#benefits`}
              className="mobile_link"
              onClick={handleNavClick}
            >
              {currentLan === "ru" ? "Преимущества" : "Benefits"}
            </HashLink>
            <HashLink
              smooth
              to={`${basePath}#vacancies`}
              className="mobile_link"
              onClick={handleNavClick}
            >
              {currentLan === "ru" ? "Вакансии" : "Vacancies"}
            </HashLink>
            <HashLink
              smooth
              to={`${basePath}#contacts`}
              className="mobile_link"
              onClick={handleNavClick}
            >
              {currentLan === "ru" ? "Связаться с нами" : "Contact us"}
            </HashLink>
          </div>

          <div className="mobile-language_wrapper">
            <select
              className="mobile-language_container"
              onChange={(e) => handleLanguage(e.target.value)}
              value={currentLan}
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
            <img src={DownArrow} alt="arrow" className="downArrow" />
          </div>

          <HashLink
            smooth
            to={`${basePath}/#vacancies`}
            className="no_underline"
          >
            <Button
              text={currentLan === "ru" ? "Подать заявку" : "Apply now"}
              variant="black"
              imgSrc={RightArrow}
              onButtonClick={handleNavClick}
            />
          </HashLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;
