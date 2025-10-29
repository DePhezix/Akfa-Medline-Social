import "./Hero.scss";
import { useState, useEffect, useContext } from "react";
import HeroImage from "/Akfa-Medline-Social/svgs/hero.svg";
import SearchIcon from "/Akfa-Medline-Social/svgs/search-icon.svg";
import RightArrow from "/Akfa-Medline-Social/svgs/right-white-arrow.svg";
import Button from "../../../components/Button/Button";
import axios from "axios";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { LandingHeroSearchContext } from "../../../contexts/LandingHeroSearchContext";
import { HashLink } from "react-router-hash-link";
import HeroSearch from "../HeroSearch/HeroSearch";

function Hero() {
  const [waitingList, setWaitingList] = useState({});
  const { isSearchOpen, setIsSearchOpen } = useContext(
    LandingHeroSearchContext
  );
  const { setIsLoading } = useContext(LoadingContext);

  const handleButtonClick = () => {
    setIsSearchOpen(true);
  };

  useEffect(() => {
    const fetchWaitListData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://hr.centralasian.uz/api/dashboard/social/v3/stats/by-schools"
        );

        const updatedList = {};
        res.data.forEach((item) => {
          updatedList[item.name] = item.response;
        });

        setWaitingList(updatedList);
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
      <div className="hero-container">
        <div
          className="img-backround"
          style={{ backgroundImage: `url(${HeroImage})` }}
        >
          <div className="top-text_container">
            <div className="heading_container">
              <div className="header">
                Набираем команду, <br />
                где каждый профессионал важен
              </div>
            </div>
            <div className="button-container">
              <div className="input-container" onClick={handleButtonClick}>
                <img src={SearchIcon} className="search-icon" />
                <input
                  placeholder="Поиск по вакансии"
                  className="input"
                  readOnly
                />
              </div>
              <HashLink
                smooth
                to="/Akfa-Medline-Social/#vacancies"
                className="hash-link"
              >
                <Button text="Подать заявку" imgSrc={RightArrow} />
              </HashLink>
            </div>
          </div>

          <div className="stats_container">
            <div className="secondary-header_container">
              <h3 className="secondary-header">
                Следите за количеством заявок
              </h3>
              <div className="secondary-header_subtitle">
                Поданные заявки на вакансии по направлениям:
              </div>
            </div>

            <div className="stats_container-2">
              <div className="frame frame-1">
                <div className="frame-title">Врачи / Специалисты</div>
                <div className="frame-number">
                  {
                    waitingList[
                      "Врачи / Специалисты (Physicians & Specialists)"
                    ]
                  }
                </div>
              </div>

              <div className="frame frame-2">
                <div className="frame-title">
                  Медицинский и сестринский персонал
                </div>
                <div className="frame-number">
                  {
                    waitingList[
                      "Медицинский и сестринский персонал (Nursing & Clinical Staff)"
                    ]
                  }
                </div>
              </div>

              <div className="frame frame-3">
                <div className="frame-title">
                  Менеджмент и управленческий персонал
                </div>
                <div className="frame-number">
                  {
                    waitingList[
                      "Менеджмент и управленческий персонал (Leadership & Management)"
                    ]
                  }
                </div>
              </div>

              <div className="frame frame-4">
                <div className="frame-title">Персонал лабораторные службы</div>
                <div className="frame-number">
                  {waitingList["Лабораторные службы (Diagnostics)"]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSearchOpen && <HeroSearch />}
    </>
  );
}

export default Hero;
