import "./App.css";
import { useContext, useEffect } from "react";
import { LoadingContext } from "./contexts/LoadingContext";
import { Routes, Route } from "react-router";
import Header from "./sections/Global/Header/Header";
import Footer from "./sections/Global/Footer/Footer";
import LandingPage from "./pages/Landing/Landing";
import JobDetails from "./pages/JobDetails/JobDetails";
import { PopUpContext } from "./contexts/PopupContext";

function App() {
  const { isPopUpOpen } = useContext(PopUpContext);
  const { isLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (isPopUpOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isPopUpOpen]);

  return (
    <>
      <Header />
        <Routes>
          <Route path="/Akfa-Medline-Social/:language?" element={<LandingPage />} />
          <Route
            path="/Akfa-Medline-Social/jobs/:jobid/:language?"
            element={<JobDetails />}
          />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
