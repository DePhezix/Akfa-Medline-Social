import Hero from "../../sections/LandingPage/Hero/Hero.js";
import InvitationSection from "../../sections/LandingPage/LandingInvitation/Invitation.js";
import JoinUsSection from "../../sections/LandingPage/JoinUs/JoinUs.js";
import ClinicAdvantages from "../../sections/LandingPage/ClinicAdvantages/ClinicAdvantages.js";
import ApplicationRequirements from "../../sections/LandingPage/ApplicationRequirements/ApplicationRequirements.js";
import HiringDepartments from "../../sections/LandingPage/HiringDepartments/HiringDepartments.js";
import FieldSearch from "../../sections/LandingPage/FieldSearch/FieldSearch.js";
import Contacts from "../../sections/LandingPage/Contacts/Contacts.js";
import Loading from "../../sections/Global/Loading/Loading.js";
import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useBoundStore } from '../../store/Store.js'

function LandingPage() {
  const isLoading = useBoundStore((state) => state.loading)
  const setIsLoading = useBoundStore((state) => state.setLoading)
  const { language } = useParams();
  const { hash } = useLocation();
  const [currentLan, setCurrentLan] = useState(language || "ru");
  const isInitialRender = useRef(true);
  const fetchVacancies = useBoundStore((state) => state.fetchAndSetVacancies)

  useEffect(() => {
    setCurrentLan(language || "ru");

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [language]);

  useEffect(() => {
    if (!isLoading && hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [isLoading, hash]);

  useEffect(() => {
    fetchVacancies()
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="mt-[100px] h-[200px] flex flex-col items-center text-red text-[20px] font-[600] gap-[20px]">
          <Loading />
          <p className="subtitle">
            {currentLan === "ru" ? "Загрузка страницы..." : "Loading page..."}
          </p>
        </div>
      ) : (
        <>
          <Hero />
          <div className="w-full flex flex-col items-center max-2xl:pl-[30px] max-2xl:pr-[30px] max-md:pl-[16px] max-md:pr-[16px] ">
            <InvitationSection />
            <JoinUsSection />
            <ClinicAdvantages />
            <ApplicationRequirements />
            <HiringDepartments />
            <FieldSearch />
            <Contacts />
          </div>
        </>
      )}
    </>
  );
}

export default LandingPage;
