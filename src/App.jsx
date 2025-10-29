import "./App.css";
import { useContext, useEffect } from "react";
import { WaitingListContext } from "./contexts/JoinWaitingListContext";
import { HamburgerContext } from "./contexts/HamburgerContext";
import { LandingHeroSearchContext } from "./contexts/LandingHeroSearchContext";
import { Routes, Route } from "react-router";
import Header from "./sections/Global/Header/Header";
import Footer from "./sections/Global/Footer/Footer";
import LandingPage from "./pages/Landing";
import JobDetails from "./pages/JobDetails/JobDetails";
import Loading from "./sections/Global/Loading/Loading";

function App() {
  const { isOpen } = useContext(WaitingListContext);
  const { isHamburgerOpen } = useContext(HamburgerContext);
  const { isSearchOpen } = useContext(LandingHeroSearchContext);

  useEffect(() => {
    if (isOpen || isHamburgerOpen | isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isHamburgerOpen, isSearchOpen]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/Akfa-Medline-Social/" element={<LandingPage />} />
        <Route
          path="/Akfa-Medline-Social/jobs/:jobid"
          element={<JobDetails />}
        />
      </Routes>
      <Loading />
      <Footer />
    </>
  );
}

export default App;
