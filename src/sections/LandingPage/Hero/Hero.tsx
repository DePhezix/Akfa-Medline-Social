import "./Hero.scss";
import { useState, useEffect, useContext } from "react";
import HeroImage from "/svgs/hero.svg";
import SearchIcon from "/svgs/search-icon.svg";
import RightArrow from "/svgs/right-white-arrow.svg";
import Button from "../../../components/Button/Button.js";
import axios from "axios";
import { HashLink } from "react-router-hash-link";
import HeroSearch from "../HeroSearch/HeroSearch";
import { LoadingContext } from "../../../contexts/LoadingContext.js";
import { PopUpContext } from "../../../contexts/PopupContext.js";
import { useParams } from "react-router-dom";

type languageType = "en" | "ru";

type waitngListType = {
  ru: string | undefined;
  en: string | undefined;
  count: number;
};

interface textType {
  heading: string;
  searchPlaceholder: string;
  buttonText: string;
  subtitle: string;
  subheader: string;
}

interface backendWaitlistDataType {
  name: string;
  response: number;
}

function Hero() {
  const [waitingList, setWaitingList] = useState<waitngListType[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const { setIsPopUpOpen } = useContext(PopUpContext);
  const { setIsLoading } = useContext(LoadingContext);
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
    const fetchWaitListData = async () => {
      try {
        // setIsLoading(true);
        const res = await axios.get<backendWaitlistDataType[]>(
          "https://hr.centralasian.uz/api/dashboard/social/v3/stats/by-schools"
        );

        const parsedList: waitngListType[] = res.data.map((item) => {
          const match = item.name.match(/^(.*?)\s*\((.*?)\)/);
          const russian = match ? match[1]?.trim() : item.name;
          const english = match ? match[2]?.trim() : item.name;
          return {
            ru: russian,
            en: english,
            count: item.response,
          };
        });

        setWaitingList(parsedList);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaitListData();
  }, []);

  return (
    <>
      <main className="hero-container">
        <div
          className="img-backround"
          style={{ backgroundImage: `url(${HeroImage})` }}
        >
          <div className="top-text_container">
            <div className="heading_container">
              <h1
                className="header"
                dangerouslySetInnerHTML={{ __html: text[currentLan].heading }}
              />
            </div>

            <div className="button-container">
              <div className="input-container" onClick={handleButtonClick}>
                <img src={SearchIcon} className="search-icon" />
                <input
                  placeholder={text[currentLan].searchPlaceholder}
                  className="input"
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
                className="hash-link"
              >
                <Button
                  text={text[currentLan].buttonText}
                  imgSrc={RightArrow}
                />
              </HashLink>
            </div>
          </div>

          <div className="stats_container">
            <div className="secondary-header_container">
              <h3 className="secondary-header">{text[currentLan].subtitle}</h3>
              <h5 className="secondary-header_subtitle">
                {text[currentLan].subheader}
              </h5>
            </div>

            <div className="stats_container-2">
              {waitingList.map((item, index) => (
                <div key={index} className={`frame frame-${index + 1}`}>
                  <p className="frame-title">{item[currentLan]}</p>
                  <p className="frame-number">{item.count}</p>
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
