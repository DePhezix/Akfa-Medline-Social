import "./App.css";
import { useContext, useEffect } from "react";
import { LoadingContext } from "./contexts/LoadingContext";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layouts/layout";

import LandingPage from "./pages/Landing/Landing";
import JobDetails from "./pages/JobDetails/JobDetails";
import { PopUpContext } from "./contexts/PopupContext";

function App() {
  const { isPopUpOpen } = useContext(PopUpContext);

  useEffect(() => {
    document.body.style.overflow = isPopUpOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isPopUpOpen]);

  const router = createBrowserRouter([
    {
      path: "/Akfa-Medline-Social",
      element: <Layout />,
      children: [
        {
          path: ":language?",
          element: <LandingPage />,
        },
        {
          path: ":language?/jobs/:jobid",
          element: <JobDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
