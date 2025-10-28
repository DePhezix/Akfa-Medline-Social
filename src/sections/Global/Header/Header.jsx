import { useContext } from "react";
import "./Header.scss";
import Logo from "/svgs/header_logo.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import DownArrow from "/svgs/downArrow.svg";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { HamburgerContext } from "../../../contexts/HamburgerContext";
import { WaitingListContext } from "../../../Contexts/JoinWaitingListContext";
import Button from "../../../components/Button/Button";

function Header() {
  const { isHamburgerOpen, setIsHamburgerOpen } = useContext(HamburgerContext);
  const { setIsOpen } = useContext(WaitingListContext);
  const NavLinks = [
    {
      name: "Связаться с нами",
      linkTo: "/#contacts",
    },
  ];

  const toggleMenu = () => setIsHamburgerOpen((prev) => !prev);

  const handleWaitlistClick = () => {
    setIsHamburgerOpen(false);
    setIsOpen(true);
  };

  const handleNavClick = () => {
    setIsHamburgerOpen(false);
  };

  return (
    <div className="header-container">
      <Link to="" className="header-container_logo">
        <img src={Logo} alt="Logo" />
      </Link>

      <div className="header-container_text">
        <HashLink smooth to="/#contacts" className="navlink">
          Связаться с нами
        </HashLink>
        <div className="header-container_language-container">
          <div className="header-container_language_background">
            <div className="header-container_language-container_2">
              <div className="header-container_language">Русский</div>
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
              to="/#benefits"
              className="mobile_link"
              onClick={handleNavClick}
            >
              Преимущества
            </HashLink>
            <HashLink
              smooth
              to="/#vacancies"
              className="mobile_link"
              onClick={handleNavClick}
            >
              Вакансии
            </HashLink>
            <HashLink
              smooth
              to="/#contacts"
              className="mobile_link"
              onClick={handleNavClick}
            >
              Связаться с нами
            </HashLink>
          </div>
          <div className="mobile-language_container">
            <span className="mobile-language">RU</span>
            <img src={DownArrow} alt="" className="downArrow" />
          </div>
          <Button
            text="Подать заявку"
            variant="black"
            imgSrc={RightArrow}
            onButtonClick={handleWaitlistClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
