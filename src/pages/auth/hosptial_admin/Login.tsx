import { Calendar, Shield, UserCircle, Users } from "lucide-react";
import type { LoginConfig } from "../../../types/auth.login";
import AuthLoginTemplate from "../../../components/ReuseableComponets/Auth/AuthLoginTemplate";

const adminLoginConfig: LoginConfig = {
  role: "admin",
  title: "Hospital Admin Login",
  subtitle: "Manage healthcare operations",
  brandingTitle: "Healthcare Management System",
  brandingDescription:
    "Monitor and manage doctors, patients, appointments, and system operations from your centralized dashboard.",
  illustration: (
    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center">
      <UserCircle size={48} className="text-purple-600" />
    </div>
  ),
  features: [
    { icon: <Users className="text-purple-600" size={20} />, label: "Manage" },
    {
      icon: <Shield className="text-purple-600" size={20} />,
      label: "Control",
    },
    {
      icon: <Calendar className="text-purple-600" size={20} />,
      label: "Monitor",
    },
  ],
  logoIcon: <UserCircle className="text-white" size={24} />,
  brandName: "HealthCare Admin",
  showGoogleLogin: false,
  showSignUp: false,
  bgGradient: "bg-gradient-to-br from-purple-100 to-purple-50",
  iconBg: "bg-purple-500",
  buttonBg: "bg-purple-600",
  buttonHover: "hover:bg-purple-700",
  textColor: "text-purple-600 hover:text-purple-700",
  focusBorder: "focus:border-purple-500",
  focusRing: "focus:ring-2 focus:ring-purple-100",
};

const HospitalAdminLoginPage = () => {
  function handleLogin() {
    console.log("patient is login ");
  }
  return (
    <div>
      <AuthLoginTemplate
        config={adminLoginConfig}
        onLogin={handleLogin}
        onGoogleLogin={() => console.log("Google login")}
        onForgotPassword={() => console.log("Forgot password")}
        onSignUp={() => console.log("Sign up")}
      />
    </div>
  );
};

export default HospitalAdminLoginPage;
