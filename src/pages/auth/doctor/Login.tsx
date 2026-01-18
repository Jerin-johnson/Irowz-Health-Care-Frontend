import { useNavigate } from "react-router-dom";
import AuthLoginTemplate from "../../../components/ReuseableComponets/Auth/AuthLoginTemplate";
import { useAppDispatch } from "../../../store/hooks";

import type { LoginConfig } from "../../../types/auth.login";

import { Shield, Calendar, Users, Stethoscope } from "lucide-react";
import UserRoles from "../../../constants/UserRole";
import {
  loginThunk,
  type UserRoleExluce,
} from "../../../store/slice/Auth/auth.thunks";

const doctorLoginConfig: LoginConfig = {
  role: "doctor",
  title: "Doctor Login",
  subtitle: "Access your practice management portal",
  brandingTitle: "Empowering Healthcare Professionals",
  brandingDescription:
    "Manage appointments, patient records, prescriptions, and consultations efficiently from a single platform.",
  illustration: (
    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center">
      <Stethoscope size={48} className="text-green-600" />
    </div>
  ),
  features: [
    {
      icon: <Calendar className="text-green-600" size={20} />,
      label: "Schedule",
    },
    { icon: <Users className="text-green-600" size={20} />, label: "Patients" },
    { icon: <Shield className="text-green-600" size={20} />, label: "Secure" },
  ],
  logoIcon: <Stethoscope className="text-white" size={24} />,
  brandName: "HealthCare Pro",
  showGoogleLogin: false,
  showSignUp: false,
  bgGradient: "bg-gradient-to-br from-green-100 to-green-50",
  iconBg: "bg-green-500",
  buttonBg: "bg-green-600",
  buttonHover: "hover:bg-green-700",
  textColor: "text-green-600 hover:text-green-700",
  focusBorder: "focus:border-green-500",
  focusRing: "focus:ring-2 focus:ring-green-100",
};

const DoctorLoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const role = UserRoles.DOCTOR;

      await dispatch(
        loginThunk({
          userEmail: email,
          password,
          UserRole: role as UserRoleExluce,
        }),
      ).unwrap();

      navigate("/doctor/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  return (
    <AuthLoginTemplate
      config={doctorLoginConfig}
      onLogin={handleLogin}
      onGoogleLogin={() => console.log("Google login")}
      onForgotPassword={() => navigate("/forgot-password")}
      onSignUp={() => console.log("Sign up")}
    />
  );
};

export default DoctorLoginPage;
