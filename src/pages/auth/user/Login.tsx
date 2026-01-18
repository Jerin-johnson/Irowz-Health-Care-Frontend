import { useNavigate } from "react-router-dom";
import AuthLoginTemplate from "../../../components/ReuseableComponets/Auth/AuthLoginTemplate";
import { useAppDispatch } from "../../../store/hooks";

import type { LoginConfig } from "../../../types/auth.login";

import { Shield, Calendar, Users } from "lucide-react";
import UserRoles from "../../../constants/UserRole";
import {
  loginThunk,
  type UserRoleExluce,
} from "../../../store/slice/Auth/auth.thunks";
import { notify } from "../../../shared/notification/toast";

const userLoginConfig: LoginConfig = {
  role: "user",
  title: "Patient Login",
  subtitle: "Access your medical records securely",
  brandingTitle: "Your Health, Our Priority",
  brandingDescription:
    "Access your medical records, prescriptions, lab results, and appointments anytime, anywhere with complete security.",
  illustration: (
    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center">
      <Users size={48} className="text-blue-600" />
    </div>
  ),
  features: [
    { icon: <Shield className="text-blue-600" size={20} />, label: "Secure" },
    {
      icon: <Calendar className="text-blue-600" size={20} />,
      label: "24/7 Access",
    },
    { icon: <Users className="text-blue-600" size={20} />, label: "Trusted" },
  ],
  logoIcon: <Shield className="text-white" size={24} />,
  brandName: "HealthCare",
  showGoogleLogin: false,
  showSignUp: true,
  bgGradient: "bg-gradient-to-br from-blue-100 to-blue-50",
  iconBg: "bg-blue-500",
  buttonBg: "bg-blue-600",
  buttonHover: "hover:bg-blue-700",
  textColor: "text-blue-600 hover:text-blue-700",
  focusBorder: "focus:border-blue-500",
  focusRing: "focus:ring-2 focus:ring-blue-100",
};

const UserLoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const role = UserRoles.PATIENT;
    try {
      await dispatch(
        loginThunk({
          userEmail: email,
          password,
          UserRole: role as UserRoleExluce,
        }),
      ).unwrap();
      notify.success("Patient logged in successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthLoginTemplate
      config={userLoginConfig}
      onLogin={handleLogin}
      onGoogleLogin={() => console.log("Google login")}
      onForgotPassword={() => navigate("/forgot-password")}
      onSignUp={() => console.log("Sign up")}
    />
  );
};

export default UserLoginPage;
