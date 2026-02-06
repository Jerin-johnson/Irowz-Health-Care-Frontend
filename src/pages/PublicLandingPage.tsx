import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
// import { SearchBar } from "../components/common/Sreach";
import DoctorsSection from "../components/landingPage/DoctorCard";
import Footer from "../components/landingPage/Footer";
import HowItWorksSection from "../components/landingPage/HowItWork";
import { Navbar } from "../components/navbar/PublicNavbar";

const LandingPage: React.FC = () => {
  const naviage = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Consult <span className="text-blue-500">Best Doctors</span>{" "}
                  Your
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Nearby Location.
                </h1>
              </div>

              <p className="text-gray-600 text-lg">
                Discover instant bookings, real-time slots & secure payments on
                mobile/web. Connect with top doctors now!
              </p>

              <Button
                variant="primary"
                className="text-lg px-8 py-3"
                onClick={() => naviage("patient/doctors")}
              >
                Start a Consult
              </Button>

              {/* Search Bar */}
              {/* <SearchBar /> */}
            </div>

            {/* Right Content - Doctor Image */}
            <div className="relative h-96 lg:h-[600px]">
              <img src="/image-5.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* <DoctorsSection /> */}

      <HowItWorksSection />
      <Footer />
    </>
  );
};

export default LandingPage;
