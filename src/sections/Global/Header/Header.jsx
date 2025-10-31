import { useState, useContext } from "react";
import "./Header.scss";
import Logo from "/svgs/header_logo.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import DownArrow from "/svgs/downArrow.svg";
import { HashLink } from "react-router-hash-link";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { PopUpContext } from "../../../contexts/PopupContext";

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { setIsPopUpOpen } = useContext(PopUpContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentLan = pathname.includes("/en") ? "en" : "ru";
  const basePath =
    currentLan === "ru"
      ? "/Akfa-Medline-Social"
      : `/Akfa-Medline-Social/${currentLan}`;

  const toggleMenu = () => {
    setIsHamburgerOpen((prev) => !prev);
    setIsPopUpOpen((prev) => !prev);
  };

  const handleLanguage = (lan) => {
    if (lan === "ru") {
      navigate("/Akfa-Medline-Social/");
    } else {
      navigate(`/Akfa-Medline-Social/${lan}`);
    }
  };

  const handleNavClick = () => {
    setIsHamburgerOpen(false);
    setIsPopUpOpen(false);
  };

  return (
    <nav className="header-container">
      <Link to={`${basePath}/`} className="header-container_logo">
        <img src={Logo} alt="Logo" />
      </Link>

      <div className="header-container_text">
        <HashLink smooth to={`${basePath}/#contacts`} className="navlink">
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

      {/* HAMBURGER ICON */}
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

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isHamburgerOpen ? "show" : ""}`}>
        <div className="menu">
          <div className="mobile_nav">
            <HashLink
              smooth
              to={`${basePath}/#benefits`}
              className="mobile_link"
              onClick={handleNavClick}
            >
              {currentLan === "ru" ? "Преимущества" : "Benefits"}
            </HashLink>
            <HashLink
              smooth
              to={`${basePath}/#vacancies`}
              className="mobile_link"
              onClick={handleNavClick}
            >
              {currentLan === "ru" ? "Вакансии" : "Vacancies"}
            </HashLink>
            <HashLink
              smooth
              to={`${basePath}/#contacts`}
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
