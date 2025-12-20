// ==================== TYPES ====================
export interface LoginFormData {
  email: string;
  password: string;
}

interface FeatureItem {
  icon: React.ReactNode;
  label: string;
}

export interface LoginConfig {
  role: "user" | "doctor" | "admin" | "superadmin";
  title: string;
  subtitle: string;
  brandingTitle: string;
  brandingDescription: string;
  illustration: React.ReactNode;
  features: FeatureItem[];
  logoIcon: React.ReactNode;
  brandName: string;
  showGoogleLogin?: boolean;
  showSignUp?: boolean;
  bgGradient: string;
  iconBg: string;
  buttonBg: string;
  buttonHover: string;
  textColor: string;
  focusBorder: string;
  focusRing: string;
}

export interface LoginComponentProps {
  config: LoginConfig;
  onLogin?: (data: LoginFormData) => void;
  onGoogleLogin?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}
