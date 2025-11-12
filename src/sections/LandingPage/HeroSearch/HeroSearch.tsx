import "./HeroSearch.scss";
import {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent
} from "react";
import { LoadingContext } from "../../../contexts/LoadingContext.js";
import { PopUpContext } from "../../../contexts/PopupContext.js";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CloseImg from "/svgs/x.svg";
import SearchImg from "/svgs/search-icon.svg";

type Props = {
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};

interface backendVacanciesData {
  title: string;
  id: number;
  category: string;
}

type languagesType = "en" | "ru"

function HeroSearch({ setIsSearchOpen }: Props) {
  const { setIsLoading } = useContext(LoadingContext);
  const { setIsPopUpOpen } = useContext(PopUpContext);
  const { language } = useParams<{language: languagesType}>();

  const [vacancies, setVacancies] = useState<backendVacanciesData[]>([]);
  const [filteredVacancies, setFilteredVacancies] = useState<backendVacanciesData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<backendVacanciesData[]>(
          "https://hr.centralasian.uz/api/social/vacancies"
        );

        if (Array.isArray(res.data)) {
          setVacancies(res.data);
          setFilteredVacancies(res.data.slice(0, 8));
        }
      } catch (err) {
        console.error("Error fetching vacancies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredVacancies(vacancies.slice(0, 8));
      return;
    }

    const filtered = vacancies.filter((v) =>
      v.title.toLowerCase().includes(value)
    );
    setFilteredVacancies(filtered);
  };

  const handleClose = () => {
    setIsPopUpOpen(false);
    setIsSearchOpen(false);
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredVacancies(vacancies.slice(0, 8));
  };

  const getVacancyLink = (id: number) => {
    if (language && language !== "ru") {
      return `/Akfa-Medline-Social/${language}/jobs/${id}/`;
    }
    return `/Akfa-Medline-Social/jobs/${id}`;
  };

  return (
    <div className="HeroSearchContainer" onClick={handleClose}>
      <div className="ContentContainer" onClick={stopPropagation}>
        <div className="SearchContainer">
          <img src={SearchImg} alt="search icon" className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {searchTerm && (
            <img
              src={CloseImg}
              alt="clear search"
              className="close-button"
              onClick={clearSearch}
            />
          )}
        </div>

        <div className="VacanciesContainer">
          <div className="title">
            {searchTerm
              ? filteredVacancies.length > 0
                ? `Showing ${filteredVacancies.length} results`
                : "No vacancies found"
              : `Popular Vacancies (showing ${filteredVacancies.length})`}
          </div>

          <div className="Vacancies">
            {filteredVacancies.map((vacancy) => (
              <Link
                to={getVacancyLink(vacancy.id)}
                className="VacancyContainer"
                key={vacancy.id}
                onClick={handleClose}
              >
                <div className="vacancyTitle">{vacancy.title}</div>
                <div className="vacancyCategory">{vacancy.category}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSearch;
