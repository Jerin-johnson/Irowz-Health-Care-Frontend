import { Outlet } from "react-router-dom";
import Footer from "../components/landingPage/Footer";
import { Navbar } from "../components/navbar/PublicNavbar";
import AiChatBubble from "../components/common/Chat";

const PatientLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navbar />

        <AiChatBubble />

        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default PatientLayout;
