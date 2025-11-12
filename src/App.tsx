import "./App.css";
import { useContext, useEffect } from "react";
import { LoadingContext } from "./contexts/LoadingContext.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layouts/layout.js";

import LandingPage from "./pages/Landing/Landing.js";
import JobDetails from "./pages/JobDetails/JobDetails.js";
import { PopUpContext } from "./contexts/PopupContext.js";

function App() {
  const { isPopUpOpen } = useContext(PopUpContext);

  useEffect(() => {
    const originalOverflow: string = document.body.style.overflow;
    document.body.style.overflow = isPopUpOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
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
