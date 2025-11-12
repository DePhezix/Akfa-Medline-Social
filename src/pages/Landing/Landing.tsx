import "./Landing.scss";
import Hero from "../../sections/LandingPage/Hero/Hero";
import InvitationSection from "../../sections/LandingPage/LandingInvitation/Invitation";
import JoinUsSection from "../../sections/LandingPage/JoinUs/JoinUs";
import ClinicAdvantages from "../../sections/LandingPage/ClinicAdvantages/ClinicAdvantages";
import ApplicationRequirements from "../../sections/LandingPage/ApplicationRequirements/ApplicationRequirements";
import HiringDepartments from "../../sections/LandingPage/HiringDepartments/HiringDepartments";
import FieldSearch from "../../sections/LandingPage/FieldSearch/FieldSearch";
import Contacts from "../../sections/LandingPage/Contacts/Contacts";
import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingContext.js";
import Loading from "../../sections/Global/Loading/Loading";

function LandingPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { language } = useParams();
  const { hash } = useLocation();
  const [currentLan, setCurrentLan] = useState(language || "ru");
  const isInitialRender = useRef(true);

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

  return (
    <>
      {isLoading ? (
        <div className="LandingLoadingWrapper">
          <Loading />
          <p className="subtitle">
            {currentLan === "ru" ? "Загрузка страницы..." : "Loading page..."}
          </p>
        </div>
      ) : (
        <>
          <Hero />
          <div className="restSections">
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
