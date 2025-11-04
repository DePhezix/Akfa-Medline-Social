import Header from "../sections/Global/Header/Header";
import Footer from "../sections/Global/Footer/Footer";
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