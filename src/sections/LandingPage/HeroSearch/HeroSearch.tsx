import "./HeroSearch.scss";
import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent
} from "react";
import { Link, useParams } from "react-router-dom";
import CloseImg from "/svgs/x.svg";
import SearchImg from "/svgs/search-icon.svg";
import { useBoundStore } from "../../../store/Store.js";

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
  const setIsPopUpOpen = useBoundStore(state => state.setPopUp)
  const { language } = useParams<{language: languagesType}>();

  const vacancies = useBoundStore((state) => state.vacancies);
  const [filteredVacancies, setFilteredVacancies] = useState<backendVacanciesData[]>(vacancies.slice(0, 8));
  const [searchTerm, setSearchTerm] = useState<string>("");

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
