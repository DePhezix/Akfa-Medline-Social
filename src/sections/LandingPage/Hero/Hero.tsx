import { useState, useEffect } from "react";
import HeroImage from "/svgs/hero.svg";
import SearchIcon from "/svgs/search-icon.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import Button from "../../../components/Button/Button.js";
import { HashLink } from "react-router-hash-link";
import HeroSearch from "../HeroSearch/HeroSearch.js";
import { useParams } from "react-router-dom";
import { useBoundStore } from "../../../store/Store.js";

type languageType = "en" | "ru";

interface textType {
  heading: string;
  searchPlaceholder: string;
  buttonText: string;
  subtitle: string;
  subheader: string;
}

function Hero() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const waitingList = useBoundStore((state) => state.vacancyStats);
  const fetchWaitingList = useBoundStore((state) => state.fetchAndSetVacancyStats)
  const setIsPopUpOpen = useBoundStore(state => state.setPopUp)
  const { language } = useParams<{ language: languageType }>();
  const currentLan = language || "ru";

  const text: Record<languageType, textType> = {
    ru: {
      heading: "Набираем команду, <br /> где каждый профессионал важен",
      searchPlaceholder: "Поиск по вакансии",
      buttonText: "Подать заявку",
      subtitle: "Следите за количеством заявок",
      subheader: "Поданные заявки на вакансии по направлениям:",
    },
    en: {
      heading: "We are recruiting a team where every professional is important",

      searchPlaceholder: "Search by vacancy",
      buttonText: "Submit an Application",
      subtitle: "Keep track of the number of applications",
      subheader: "Applications submitted for vacancies in the following areas:",
    },
  };

  const handleButtonClick = () => {
    setIsPopUpOpen(true);
    setIsSearchOpen(true);
  };

  useEffect(() => {
    fetchWaitingList()
  }, []);

  return (
    <>
      <main className="w-full h-[650px] text-[#ffff] mt-[15.85px] pl-[15.625px] pr-[15.625px] max-2xl:overflow-x-hidden max-md:mt-[0] max-md:h-min max-md:p-[0]">
        <div
          className="h-[650px] relative rounded-[16px] bg-cover bg-no-repeat max-md:pt-[200px] max-md:flex max-md:flex-col max-md:bg-center max-md:h-min"
          style={{ backgroundImage: `url(${HeroImage})` }}
        >
          <div className="absolute top-[109px] left-[60px] gap-[36px] w-[905px] flex flex-col max-md:static max-md:content-end max-md:items-center max-md:w-full max-md:h-full max-md:gap-[44px] max-md:p-[24px] max-md:pl-[16px] max-md:pr[16px] max-md:mb-[40px]">
            <div className="w-[628px] h-min max-md:w-full">
              <h1
                className="w-[628px] h-[202px] text-[56px] leading-[67.2px] tracking-[-1px] align-middle max-md:text-[32px] max-md:font-[400] max-md:leading-[40px] max-md:h-min max-md:w-full"
                dangerouslySetInnerHTML={{ __html: text[currentLan].heading }}
              />
            </div>

            <div className="gap-[16px] w-max h-min flex max-md:flex-col max-md:w-full">
              <div
                className="flex rounded-[5px] p-[24px] pt-[16px] pb-[16px] gap-[15px] bg-white items-center cursor-pointer max-md:w-full "
                onClick={handleButtonClick}
              >
                <img src={SearchIcon} />
                <input
                  placeholder={text[currentLan].searchPlaceholder}
                  className="w-[256px] h-[19px] text-[#c2c2c2] text-[16px] bg-transparent pointer-events-none focus:outline-none max-md:w-full"
                  readOnly
                />
              </div>
              <HashLink
                smooth
                to={
                  currentLan === "ru"
                    ? "/Akfa-Medline-Social/#vacancies"
                    : `/Akfa-Medline-Social/${currentLan}#vacancies`
                }
                className="no-underline"
              >
                <Button
                  text={text[currentLan].buttonText}
                  imgSrc={RightArrow}
                />
              </HashLink>
            </div>
          </div>

          <div className="absolute top-[441px] left-[60px] gap-[36px] flex flex-col max-md:static max-md:pb-[40px] max-md:pl-[16px] max-md:pr-[16px]">
            <div className="flex flex-col gap-[12px] justify-center">
              <h3 className="w-max font-[500] text-[24px] tracking-[-0.5px] align-middle max-md:w-full">
                {text[currentLan].subtitle}
              </h3>
              <h5 className="text-[12px] leading-[14.4px] h-[15px] align-middle">
                {text[currentLan].subheader}
              </h5>
            </div>

            <div className="flex gap-[16.5px] max-md:grid max-md:grid-cols-2 max-md:gap-[1rem]">
              {waitingList.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col pr-[24px] gap-[8px] border-r border-solid border-[rgba(255, 255, 255, 0.4)] h-[62px] max-md:h-min"
                >
                  <p className="h-[15px] font-[500] leading-[14.4px] tracking-[-0.24px] text-[12px] max-2xl:h-max">
                    {item[currentLan]}
                  </p>
                  <p className="font-[500] text-[32px] leading-[38.4px] tracking-[-0.64px]">
                    {item.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {isSearchOpen && <HeroSearch setIsSearchOpen={setIsSearchOpen} />}
    </>
  );
}

export default Hero;
