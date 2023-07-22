import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
