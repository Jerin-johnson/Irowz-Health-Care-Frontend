import { Outlet } from "react-router-dom";
import Footer from "../components/landingPage/Footer";
import { Navbar } from "../components/navbar/PublicNavbar";

const PatientLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navbar />

        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default PatientLayout;
