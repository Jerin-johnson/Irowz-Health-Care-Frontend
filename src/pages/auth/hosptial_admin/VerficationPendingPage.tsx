import React, { useState } from "react";
import { CheckCircle, AlertTriangle, Home, Mail, Settings } from "lucide-react";
import { useAppSelector } from "../../../store/hooks";

interface SubmittedInfo {
  hospitalName: string;
  registrationNumber: string;
  city: string;
  state: string;
  contactEmail: string;
}

const VerificationStatus: React.FC = () => {
  const [emailResent, setEmailResent] = useState(false);
  const { city, email, name, register_no, status } = useAppSelector(
    (state) => state.hospitalVerification
  );
  const submittedInfo: SubmittedInfo = {
    hospitalName: "St. Mary's Medical Center",
    registrationNumber: "HRN-2024-0156",
    city: "New York",
    state: "NY",
    contactEmail: "admin@stmarysmc.com",
  };

  const handleResendEmail = () => {
    setEmailResent(true);
    setTimeout(() => setEmailResent(false), 3000);
    console.log("Confirmation email resent");
  };

  const handleBackToHome = () => {
    console.log("Navigate to home");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6"></div>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Settings
              className="w-10 h-10 text-blue-600 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Your Hospital Verification is Under Review
          </h1>

          <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-3 inline-block">
            <p className="text-sm text-gray-700">
              Our team will review your application within{" "}
              <span className="font-bold text-blue-600">24 hours</span>
            </p>
          </div>
        </div>

        {/* What Happens Next Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What happens next?
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Documents will be verified
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Hospital authenticity will be checked
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                If approved,{" "}
                <span className="font-semibold">
                  login credentials will be sent to your email
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Submitted Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Submitted Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Hospital Name</p>
              <p className="text-sm font-medium text-gray-900">{name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Registration Number</p>
              <p className="text-sm font-medium text-gray-900">{register_no}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">City</p>
              <p className="text-sm font-medium text-gray-900">
                {city}, {submittedInfo.state}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Contact Email</p>
              <p className="text-sm font-medium text-gray-900">{email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Verification status</p>
              <p className="text-sm font-medium text-yellow-900">{status}</p>
            </div>
          </div>
        </div>

        {/* Warning Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              You will not be able to log in until verification is completed.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={handleResendEmail}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Mail className="w-5 h-5" />
            {emailResent ? "Email Sent!" : "Resend Confirmation Email"}
          </button>

          <button
            onClick={handleBackToHome}
            className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Success Message */}
        {emailResent && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800 font-medium">
                Confirmation email has been resent to{" "}
                {submittedInfo.contactEmail}
              </p>
            </div>
          </div>
        )}

        {/* Support Information */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            If you don't hear from us within 24 hours, please contact support at
          </p>
          <a
            href="mailto:support@medverify.com"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            support@irowzCure
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            © 2024 irowzCure. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VerificationStatus;
