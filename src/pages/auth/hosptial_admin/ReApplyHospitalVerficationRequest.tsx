import React, { useEffect } from "react";
import { Building2, Shield, Clock, Upload } from "lucide-react";
import { states } from "../../../constants/state";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { reSubmitHospitalVerificationThunk } from "../../../store/slice/hospital/hospitalVerification.thunks";
import { notify } from "../../../shared/notification/toast";
import { ReApplyhospitalVerificationSchema } from "../../../validators/ReapplyHosptialVerfication.schema";

type FormData = z.infer<typeof ReApplyhospitalVerificationSchema>;

const ReApplyHosptialVerficationRequest: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading, status, verificationId } = useAppSelector(
    (state) => state.hospitalVerification
  );

  useEffect(() => {
    if (status === "PENDING") {
      navigate("/hospital/verification/pending");
    }
  }, [status, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ReApplyhospitalVerificationSchema),
  });

  const licenseDocument = watch("licenseDocument");

  function handleAlreadyLogin() {
    navigate("/hospital/login");
  }

  function returnFormData(data: FormData) {
    const formData = new window.FormData();

    formData.append("hospitalAddress", data.hospitalAddress);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("pincode", data.pincode);

    if (data.licenseDocument) {
      formData.append("licenseDocument", data.licenseDocument);
    }

    return formData;
  }

  const onSubmit = async (data: FormData) => {
    const formData = returnFormData(data);

    if (!verificationId) {
      return notify.error("verfication id is missing opps");
    }
    const result = await dispatch(
      reSubmitHospitalVerificationThunk({
        hospitalId: verificationId,
        formData,
      })
    );

    console.log(error);
    const check = result as any;
    if (check?.payload?.errors?.fieldErrors?.body) {
      notify.error(check?.payload?.errors?.fieldErrors?.body[0]);
      return;
    }

    if (!check?.payload?.success) {
      notify.error(check?.payload?.message);
      return;
    }

    console.log("result", result);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel */}
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-blue-700 p-8 lg:p-12 text-white">
            <div className="text-2xl font-bold">
              <span className="text-white-800">Irowz</span>
              <span className="text-black-500">CURE</span>
            </div>

            <div className="mb-12 flex justify-center">
              <svg viewBox="0 0 200 200" className="w-64 h-64">
                <rect
                  x="40"
                  y="80"
                  width="120"
                  height="100"
                  fill="#2563eb"
                  rx="4"
                />
                <rect
                  x="60"
                  y="100"
                  width="30"
                  height="40"
                  fill="#60a5fa"
                  rx="2"
                />
                <rect
                  x="110"
                  y="100"
                  width="30"
                  height="40"
                  fill="#60a5fa"
                  rx="2"
                />
                <rect
                  x="85"
                  y="80"
                  width="30"
                  height="60"
                  fill="#ef4444"
                  rx="2"
                />
                <rect
                  x="95"
                  y="90"
                  width="10"
                  height="10"
                  fill="white"
                  rx="1"
                />
                <rect
                  x="70"
                  y="60"
                  width="60"
                  height="20"
                  fill="#1e40af"
                  rx="2"
                />
                <path d="M 100 20 L 110 30 L 90 30 Z" fill="#60a5fa" />
                <circle cx="50" cy="50" r="8" fill="#93c5fd" opacity="0.6" />
                <circle cx="150" cy="60" r="6" fill="#93c5fd" opacity="0.6" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              Join Our Healthcare Network
            </h2>
            <p className="text-blue-100 mb-8">
              Connect with thousands of healthcare professionals and streamline
              your hospital operations with our comprehensive platform.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure & HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                <span className="text-sm">Quick Verification Process</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span className="text-sm">24/7 Support Team</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="lg:w-3/5 p-8 lg:p-12 overflow-y-auto max-h-screen">
            <div className="flex justify-end mb-4">
              <button
                className="text-sm text-blue-600 hover:text-blue-700"
                onClick={handleAlreadyLogin}
              >
                Already approved? Login
              </button>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ReApply Hospital Verfication Request
            </h1>
            <p className="text-gray-600 mb-8">
              Submit your hospital details for platform approval.
            </p>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Hospital Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("hospitalAddress")}
                  placeholder="Enter complete address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <p className="text-red-500 text-sm">
                  {errors.hospitalAddress?.message}
                </p>
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("city")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
                    type="text"
                  ></input>
                  <p className="text-red-500 text-sm">{errors.city?.message}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("state")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="">Select state</option>
                    {states.map((state) => (
                      <option
                        key={state}
                        value={state.toLowerCase().replace(/ /g, "-")}
                      >
                        {state}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm">
                    {errors.state?.message}
                  </p>
                </div>
              </div>

              {/* Phone & Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("pincode")}
                    placeholder="XXXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.pincode?.message}
                  </p>
                </div>
              </div>

              {/* Upload (same container, no drag logic) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Document <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center border-gray-300 hover:border-gray-400 transition">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      e.target.files &&
                      setValue("licenseDocument", e.target.files[0])
                    }
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-1 font-medium">
                      {licenseDocument
                        ? `✓ ${licenseDocument.name}`
                        : "Click to upload your license document"}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Supported: PDF, JPG, PNG (Max 5MB)
                    </p>
                  </label>
                </div>
                <p className="text-red-500 text-sm">
                  {errors.licenseDocument?.message}
                </p>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <input type="checkbox" {...register("agreeToTerms")} />
                <label className="text-sm text-gray-700">
                  I agree to HealthHub's{" "}
                  <button className="text-blue-600 hover:underline font-medium">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-blue-600 hover:underline font-medium">
                    Privacy Policy
                  </button>
                </label>
              </div>
              <p className="text-red-500 text-sm">
                {errors.agreeToTerms?.message}
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
             hover:bg-blue-700 transition shadow-lg hover:shadow-xl
             disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Request Approval"}
              </button>

              <p className="text-xs text-center text-gray-500">
                🔒 Your information is secure and will be reviewed by our team
                within 24-48 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReApplyHosptialVerficationRequest;
