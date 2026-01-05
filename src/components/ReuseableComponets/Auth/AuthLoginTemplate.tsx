import { useState } from "react";
import type {
  LoginComponentProps,
  LoginFormData,
} from "../../../types/auth.login";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

const AuthLoginTemplate: React.FC<LoginComponentProps> = ({
  config,
  onLogin,
  onGoogleLogin,
  onForgotPassword,
  onSignUp,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localerror, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const error = useAppSelector((state) => state.auth.error);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    setError("");
    if (!formData.email || !formData.password) {
      setLoading(false);
      setError("The field should not be empty");
      return;
    }

    if (onLogin) {
      onLogin(formData);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Branding */}
          <div
            className={`${config.bgGradient} p-8 lg:p-12 flex flex-col justify-between`}
          >
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div
                className={`w-10 h-10 ${config.iconBg} rounded-lg flex items-center justify-center`}
              >
                {config.logoIcon}
              </div>
              <span className="text-xl font-bold text-gray-800">
                {config.brandName}
              </span>
            </div>

            {/* Illustration */}
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <div className="flex items-center justify-center h-48">
                {config.illustration}
              </div>
            </div>

            {/* Info */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {config.brandingTitle}
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                {config.brandingDescription}
              </p>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                {config.features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-50 rounded-full mx-auto mb-2 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <p className="text-xs text-gray-600">{feature.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {config.title}
                </h1>
                <p className="text-sm text-gray-600">{config.subtitle}</p>
              </div>

              {localerror && (
                <h1 className="text-sm font-bold text-red-500 mb-2">
                  {localerror}
                </h1>
              )}

              {error && (
                <h1 className="text-sm font-bold text-red-500 mb-2">{error}</h1>
              )}

              {/* Form */}
              <div className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email or Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your email or mobile"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none ${config.focusBorder} ${config.focusRing} transition`}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-none ${config.focusBorder} ${config.focusRing} transition`}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    onClick={onForgotPassword}
                    className={`text-sm ${config.textColor} font-medium`}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  disabled={loading}
                  onClick={handleLogin}
                  className={`w-full ${config.buttonBg} text-white py-3 rounded-lg font-medium ${config.buttonHover} transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
                >
                  {loading ? "submitting" : "Login"}
                  <ArrowRight size={18} />
                </button>

                <h2>
                  {config.title === "Hospital Admin Login" ? (
                    <button
                      className="text-blue-600"
                      onClick={() => navigate("/hospital/verification")}
                    >
                      Register hospital!
                    </button>
                  ) : (
                    ""
                  )}
                </h2>

                {/* Google Login */}
                {config.showGoogleLogin && (
                  <>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">
                          or continue with
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={onGoogleLogin}
                      className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </button>
                  </>
                )}

                {/* Sign Up Link */}
                {config.showSignUp && (
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      New {config.role}?{" "}
                      <button
                        onClick={onSignUp}
                        className={`${config.textColor} font-medium`}
                      >
                        {config.role == "user" ? (
                          <Link to={"/user/register"}>Create an account</Link>
                        ) : (
                          "Create an account"
                        )}
                      </button>
                    </p>
                  </div>
                )}

                {/* Footer Links */}
                <div className="flex justify-center gap-4 text-xs text-gray-500 mt-6">
                  <a href="#" className="hover:text-gray-700">
                    Terms of Service
                  </a>
                  <span>•</span>
                  <a href="#" className="hover:text-gray-700">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginTemplate;
