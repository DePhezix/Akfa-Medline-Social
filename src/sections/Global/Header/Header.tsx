import { useState, useRef } from "react";
import Logo from "/svgs/header_logo.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import DownArrow from "/svgs/downArrow.svg";
import { HashLink } from "react-router-hash-link";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/Button/Button.js";
import { useBoundStore } from "../../../store/Store.js";
import { gsap, useGSAP } from "../../../gsapConfig.js";

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const popUp = useBoundStore((state) => state.popUp)
  const setIsPopUpOpen = useBoundStore((state) => state.setPopUp)
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentLan = pathname.includes("/en") ? "en" : "ru";
  const basePath = pathname.replace("/en", "");

  const mobileMenu = useRef<HTMLDivElement | null>(null)

 useGSAP(() => {
   const el = mobileMenu.current;

   if (isHamburgerOpen) {
     gsap.fromTo(
       el,
       { opacity: 0, scale: 1.05 },
       { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
     );
   } else {
     gsap.to(el, {
       opacity: 0,
       scale: 1.05,
       duration: 0.2,
       ease: "power2.inOut",
     });
   }
 }, [isHamburgerOpen]);


  const toggleMenu = () => {
    setIsHamburgerOpen((prev) => !prev);
    setIsPopUpOpen(!popUp);
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
    <nav className="p-[16px] pl-[80px] pr-[50px] w-full flex justify-between items-center bg-white z-50 max-2xl:p-[16px] max-2xl:pt-[32px] max-md:fixed">
      <Link
        to={
          currentLan === "ru"
            ? `/Akfa-Medline-Social/`
            : `/Akfa-Medline-Social/${currentLan}`
        }
        className="h-[50.15px] w-[100px] max-sm:h-[32px]"
      >
        <img
          src={Logo}
          alt="Logo"
          className="h-[50.15px] w-[100px] max-sm:h-[32px] max-sm:w-min"
        />
      </Link>

      <div className="flex gap-[32px] items-center max-md:hidden">
        <HashLink
          smooth
          to={`/Akfa-Medline-Social/${
            currentLan !== "ru" ? currentLan : ""
          }#contacts`}
          className="appearance-none h-full font-[400] text-[16px] cursor-pointer transition duration-300 ease-linear hover:text-red"
        >
          {currentLan === "ru" ? "Связаться с нами" : "Contact us"}
        </HashLink>

        <div className="w-[120px]">
          <div className="rounded-[10px] bg-[#eee]">
            <div className="w-[100px]">
              <select
                aria-label="Select language"
                className="p-[10px] appearance-none cursor-pointer w-[100px] font-[400] text-[14px] bg-transparent border-0 focus:outline-0"
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
        className={`hidden flex-col justify-between w-[24px] h-[24px] cursor-pointer z-1000 gap-[2px] p-[6px] pl-[3px] pr-[3px] max-md:flex max-md:sm:w-[24px] max-md:sm:h-[18px] max-md:sm:p-[0]  ${
          isHamburgerOpen ? "p-[5px]" : ""
        }`}
        onClick={toggleMenu}
      >
        <span
          className={`block h-[2px] bg-[#00332a] rounded-[2px] transition duration-300 origin-center flex-1 max-md:sm:h-[3px] ${
            isHamburgerOpen
              ? "translate-y-[150%] rotate-45 max-md:sm:translate-y-[6.5px] max-md:sm:rotate-45"
              : ""
          }`}
        />
        <span
          className={`block h-[2px] bg-[#00332a] rounded-[2px] transition duration-300 origin-center flex-1 max-md:sm:h-[3px] ${
            isHamburgerOpen ? "opacity-0 -translate-x-1/2 scale-x-80 " : ""
          }`}
        />
        <span
          className={`block h-[2px] bg-[#00332a] rounded-[2px] transition duration-300 origin-center flex-1 max-md:sm:h-[3px] ${
            isHamburgerOpen
              ? "-translate-y-[180%] rotate-135 max-md:sm:-translate-y-[7.5px] max-md:sm:-translate-x-[0.5px] max-md:sm:-rotate-45"
              : ""
          }`}
        />
      </div>

      <div
        className={`fixed right-[0]  bg-white z-1050 w-screen h-[calc(100vh-95.5px)] flex-col justify-end p-[32px] pl-[16px] pr-[16px] border-0 max-md:top-[95.5px] max-sm:top-[80px] max-sm:h-[calc(100vh-80px)] ${
          isHamburgerOpen ? "flex" : "hidden"
        }`}
        ref={mobileMenu}
      >
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[32px]">
            <HashLink
              smooth
              to={`${basePath}#benefits`}
              className="appearance-none"
              onClick={handleNavClick}
            >
              {currentLan === "ru" ? "Преимущества" : "Benefits"}
            </HashLink>
            <HashLink
              smooth
              to={`${basePath}#vacancies`}
              className="appearance-none"
              onClick={handleNavClick}
            >
              {currentLan === "ru" ? "Вакансии" : "Vacancies"}
            </HashLink>
            <HashLink
              smooth
              to={`${basePath}#contacts`}
              className="appearance-none"
              onClick={handleNavClick}
            >
              {currentLan === "ru" ? "Связаться с нами" : "Contact us"}
            </HashLink>
          </div>

          <div className="relative w-min">
            <select
              className="appearance-none flex items-center p-[12px] pl-[16px] pr-[16px] rounded-[4px] bg-[#eee]  gap-[8px] w-[80px] h-[48px] leading-[21px] text-[14px] border-0 relative max-sm:text-[14px]"
              onChange={(e) => handleLanguage(e.target.value)}
              value={currentLan}
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
            <img
              src={DownArrow}
              alt="arrow"
              className="absolute pointer-none right-[12px] top-[50%] -translate-y-1/2 w-[20px] h-[20px]"
            />
          </div>

          <HashLink
            smooth
            to={`${basePath}#vacancies`}
            className="no_underline"
          >
            <Button
              text={currentLan === "ru" ? "Подать заявку" : "Apply now"}
              variant="black"
              imgSrc={RightArrow}
              imgAlt="arrow"
              onButtonClick={handleNavClick}
            />
          </HashLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;
