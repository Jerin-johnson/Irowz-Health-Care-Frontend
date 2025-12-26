import { Settings, Shield, Users } from "lucide-react";
import type { LoginConfig } from "../../../types/auth.login";
import AuthLoginTemplate from "../../../components/ReuseableComponets/Auth/AuthLoginTemplate";

const superAdminLoginConfig: LoginConfig = {
  role: "superadmin",
  title: "Super Admin Login",
  subtitle: "Full system access and control",
  brandingTitle: "System Administration Portal",
  brandingDescription:
    "Complete control over the healthcare platform. Manage all users, system settings, and organizational configurations.",
  illustration: (
    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center">
      <Settings size={48} className="text-red-600" />
    </div>
  ),
  features: [
    {
      icon: <Shield className="text-red-600" size={20} />,
      label: "Full Access",
    },
    {
      icon: <Settings className="text-red-600" size={20} />,
      label: "Configure",
    },
    { icon: <Users className="text-red-600" size={20} />, label: "Override" },
  ],
  logoIcon: <Settings className="text-white" size={24} />,
  brandName: "HealthCare System",
  showGoogleLogin: false,
  showSignUp: false,
  bgGradient: "bg-gradient-to-br from-red-100 to-red-50",
  iconBg: "bg-red-500",
  buttonBg: "bg-red-600",
  buttonHover: "hover:bg-red-700",
  textColor: "text-red-600 hover:text-red-700",
  focusBorder: "focus:border-red-500",
  focusRing: "focus:ring-2 focus:ring-red-100",
};

const SuperAdminLoginPage = () => {
  function handleLogin() {
    console.log("patient is login ");
  }
  return (
    <AuthLoginTemplate
      config={superAdminLoginConfig}
      onLogin={handleLogin}
      onGoogleLogin={() => console.log("Google login")}
      onForgotPassword={() => console.log("Forgot password")}
      onSignUp={() => console.log("Sign up")}
    />
  );
};

export default SuperAdminLoginPage;
