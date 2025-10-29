import { useContext } from "react";
import "./Header.scss";
import Logo from "/Akfa-Medline-Social/svgs/header_logo.svg";
import RightArrow from "/Akfa-Medline-Social/svgs/right-white-arrow.svg";
import DownArrow from "/Akfa-Medline-Social/svgs/downArrow.svg";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { HamburgerContext } from "../../../contexts/HamburgerContext";
import { WaitingListContext } from "../../../contexts/JoinWaitingListContext";
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
      <Link to="/Akfa-Medline-Social" className="header-container_logo">
        <img src={Logo} alt="Logo" />
      </Link>

      <div className="header-container_text">
        <HashLink
          smooth
          to="/Akfa-Medline-Social/#contacts"
          className="navlink"
        >
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
              to="/Akfa-Medline-Social/#benefits"
              className="mobile_link"
              onClick={handleNavClick}
            >
              Преимущества
            </HashLink>
            <HashLink
              smooth
              to="/Akfa-Medline-Social/#vacancies"
              className="mobile_link"
              onClick={handleNavClick}
            >
              Вакансии
            </HashLink>
            <HashLink
              smooth
              to="/Akfa-Medline-Social/#contacts"
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
