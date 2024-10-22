import { Outlet } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import Navbar from "../components/NavbarComp/Navbar";
import Footer from "../components/FooterComp/Footer";

function DefaultLayout() {
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />
      <div
        style={{
          backgroundImage: "url('/images/background texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
