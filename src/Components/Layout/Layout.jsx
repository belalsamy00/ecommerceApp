import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "./../Navbar/Navbar";

function Layout(props) {
  return (
    <>
      <Nav />
      <main id="main" className="mt-20 transition-all  min-h-lvh ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
