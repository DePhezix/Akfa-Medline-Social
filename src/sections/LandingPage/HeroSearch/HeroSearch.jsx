import "./HeroSearch.scss";
import { useState, useContext, useEffect } from "react";
import { LandingHeroSearchContext } from "../../../contexts/LandingHeroSearchContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { Link } from "react-router-dom";
import axios from "axios";
import CloseImg from "../../../assets/svgs/x.svg";
import SearchImg from "../../../assets/svgs/search-icon.svg";

function HeroSearch() {
  const { setIsSearchOpen } = useContext(LandingHeroSearchContext);
  const { setIsLoading } = useContext(LoadingContext);

  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
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

  const handleSearch = (e) => {
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
    setIsSearchOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredVacancies(vacancies.slice(0, 8));
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
            {filteredVacancies.length > 0 &&
              filteredVacancies.map((vacancy) => (
                <Link
                  to={`/Akfa-Medline-Social/jobs/${vacancy.id}`}
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
