import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface SignupFormData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

const UserSignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (
    field: keyof SignupFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = () => {
    if (!formData.agreedToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Signup:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Branding */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 lg:p-12 flex flex-col justify-center items-center">
            {/* Illustration */}
            <div className="bg-blue-400 rounded-3xl p-8 mb-8 w-full max-w-sm">
              <div className="flex items-center justify-center h-64 relative">
                {/* Doctor illustration placeholder */}
                <div className="absolute left-8 bottom-0">
                  <div className="w-24 h-40 bg-white rounded-t-full relative">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-200 rounded-full"></div>
                    <div className="absolute bottom-0 w-full h-32 bg-gray-200 rounded-t-3xl"></div>
                  </div>
                </div>

                {/* Patient illustration placeholder */}
                <div className="absolute right-8 bottom-0">
                  <div className="w-20 h-32 bg-orange-300 rounded-t-full relative">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-orange-100 rounded-full"></div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full opacity-30"></div>
                <div className="absolute top-8 right-12 w-12 h-1 bg-white opacity-40"></div>
                <div className="absolute top-12 right-12 w-8 h-12 bg-white opacity-20 rounded"></div>
                <div className="absolute bottom-8 right-4 w-6 h-16 bg-green-300 rounded-full opacity-60"></div>
              </div>
            </div>

            {/* Info */}
            <div className="text-center max-w-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Join Our Healthcare Platform
              </h2>
              <p className="text-sm text-gray-600">
                Experience seamless digital healthcare management with our
                secure and user-friendly platform.
              </p>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Heart className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Patient Account
                </h1>
                <p className="text-sm text-gray-600">
                  Start managing your health digitally
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.mobile}
                      onChange={(e) =>
                        handleInputChange("mobile", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                {/* Password */}
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
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                    <button
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreedToTerms}
                    onChange={(e) =>
                      handleInputChange("agreedToTerms", e.target.checked)
                    }
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Signup Button */}
                <button
                  onClick={handleSignup}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl mt-2"
                >
                  Create Account
                </button>

                {/* Login Link */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to={"/user/login"}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignupPage;
