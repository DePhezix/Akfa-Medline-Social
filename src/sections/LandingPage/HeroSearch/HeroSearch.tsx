import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent,
  useRef,
  useEffect,
} from "react";
import { Link, useParams } from "react-router-dom";
import CloseImg from "/svgs/x.svg";
import SearchImg from "/svgs/search-icon.svg";
import { useBoundStore } from "../../../store/Store.js";
import { gsap, useGSAP } from "../../../gsapConfig.js";

type Props = {
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  isSearchOpen: boolean;
};

interface backendVacanciesData {
  title: string;
  id: number;
  category: string;
}

type languagesType = "en" | "ru";

function HeroSearch({ setIsSearchOpen, isSearchOpen }: Props) {
  const setIsPopUpOpen = useBoundStore((state) => state.setPopUp);
  const { language } = useParams<{ language: languagesType }>();

  const vacancies = useBoundStore((state) => state.vacancies);
  const [filteredVacancies, setFilteredVacancies] = useState<
    backendVacanciesData[]
  >(vacancies.slice(0, 8));
  const [searchTerm, setSearchTerm] = useState<string>("");

  const container = useRef<HTMLDivElement | null>(null);
  const menu = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = container.current;
    const el2 = menu.current;

    if (isSearchOpen) {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.fromTo(
        el2,
        {
          opacity: 0,
          translateY: 40,
        },
        {
          opacity: 1,
          translateY: 10,
          duration: 0.35,
        }
      );

    } else {
      gsap.to(el, {
        opacity: 0,
        scale: 1.05,
        duration: 0.2,
      });
      gsap.to(el, {
        opacity: 0,
        translate: 40,
        duration: 0.2
      })
    }
  }, [isSearchOpen])
  
  useEffect(() => {
    setFilteredVacancies(vacancies.slice(0, 8))
  });

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
    <div
      className={`fixed bg-[rgba(0,0,0,0.45)] items-center justify-center z-10000 backdrop-blur-[6px] overflow-y-auto h-screen w-screen ${
        isSearchOpen ? "flex" : "hidden"
      }`}
      onClick={handleClose}
      ref={container}
    >
      <div
        className="flex flex-col w-[758px] bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] text-black h-min shadow-middle translate-y-[10px] rounded-[10px] overflow-x-hidden"
        onClick={stopPropagation}
        ref={menu}
      >
        <div className="flex relative">
          <img
            src={SearchImg}
            alt="search icon"
            className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border-0 focus:outline-0 p-[12px] pl-[40px] pr-[40px] w-full h-[51.2px] text-[100%]"
          />
          {searchTerm && (
            <img
              src={CloseImg}
              alt="clear search"
              className="w-[28px] h-[28px] cursor-pointer rounded-[50%] flex justify-center items-center transition duration-250 ease-linear absolute right-[10px] top-1/2 -translate-y-1/2 hover:bg-[rgba(0,0,0,0.1) hover:translate-y-1/2 hover:rotate-90"
              onClick={clearSearch}
            />
          )}
        </div>

        <div>
          <div className="text-[rgb(75,85,99)] bg-[rgb(243,244,246)] p-[8px] pl-[16px] pr-[16px]">
            {searchTerm
              ? filteredVacancies.length > 0
                ? `Showing ${filteredVacancies.length} results`
                : "No vacancies found"
              : `Popular Vacancies (showing ${filteredVacancies.length})`}
          </div>

          <div className="overflow-y-auto h-[70vh] max-h-[584.4px]">
            {filteredVacancies.map((vacancy) => (
              <Link
                to={getVacancyLink(vacancy.id)}
                className="block p-[12px] pl-[16px] pr-[16px] border-b border-solid border-[rgba(229,231,235)] h-min no-underline hover:bg-[rgb(249,250,251)]"
                key={vacancy.id}
                onClick={handleClose}
              >
                <div className="font-[500] text-[rgb(17,24,39)] leading-[24px]">
                  {vacancy.title}
                </div>
                <div className="text-[rgb(107,114,128)] text-[0.875rem] leading-[1.25rem] mt-[0.25rem]">
                  {vacancy.category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSearch;
