import Header from "../sections/Global/Header/Header.tsx";
import Footer from "../sections/Global/Footer/Footer.tsx";
import { Outlet, ScrollRestoration } from 'react-router-dom'


function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default Layout