import React, { useEffect, useState } from "react";
import { FileText, ExternalLink, AlertCircle, X, Check } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  approveHospitalVerficationRequest,
  getHospitalRequestByID,
  rejectHospitalVerficationRequest,
} from "../../../api/apiService/superAdmin/hosptialVerfication.service";
import { confirmAction } from "../../../shared/notification/confirm";
import { notify } from "../../../shared/notification/toast";

interface HospitalVerification {
  _id: string;
  hospitalName: string;
  registrationNumber: string;
  hospitalAddress: string;
  city: string;
  state: string;
  officialEmail: string;
  phone: string;
  licenseDocumentUrl: string;
  submittedAt: string;
  adminRemarks: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const HospitalVerificationReview: React.FC = () => {
  const [checklist, setChecklist] = useState({
    licenseVerified: false,
    registrationVerified: false,
    contactVerified: false,
    phoneVerified: false,
    addressVerified: false,
  });

  const [data, setData] = useState<HospitalVerification | null>(null);

  const [internalNotes, setInternalNotes] = useState("");
  const { id } = useParams();

  const handleChecklistChange = (field: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleReject = async () => {
    if (internalNotes.length < 3) {
      return notify.error(
        "Reject Reason is mandatory actually please add that "
      );
    }

    const isConfirmed = await confirmAction({
      title: "Reject Hospital?",
      description: "This will reject the hosptial verfication request",
      confirmText: "Reject",
      type: "warning",
    });

    if (!isConfirmed) return;

    try {
      await rejectHospitalVerficationRequest(id as string, internalNotes);
      setData((prev) => (prev ? { ...prev, status: "REJECTED" } : prev));
      notify.info("Reject the hosptial verfication request");
    } catch (error: any) {
      console.log(error);
      notify.error(
        error?.response?.data?.message || "Reject failed. Please try again."
      );
    }
  };

  const handleApprove = async () => {
    const allChecked = Object.values(checklist).every((v) => v);
    if (!allChecked) {
      notify.error(
        "Please complete all verification checklist items before approving."
      );
      return;
    }
    const isConfirmed = await confirmAction({
      title: "Approve Hospital?",
      description:
        "This will create a hospital admin account and cannot be undone.",
      confirmText: "Approve",
      type: "error",
    });

    if (!isConfirmed) return;

    try {
      await approveHospitalVerficationRequest(id as string, internalNotes);
      setData((prev) => (prev ? { ...prev, status: "APPROVED" } : prev));
      notify.success("Hospital approved successfully");
    } catch (error: any) {
      console.log(error);
      notify.error(
        error?.response?.data?.message || "Approval failed. Please try again."
      );
    }
  };

  useEffect(() => {
    async function fetch() {
      console.log(id);
      const result = await getHospitalRequestByID(id as string);
      setData(result);
    }

    fetch();
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Hospital Verification Review
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Review hospital details, verify documents, and approve or reject
            onboarding
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Hospital Info Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {data.hospitalName}
              </h2>
              {data.status === "PENDING" && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {data.status}
                </span>
              )}
              {data.status === "APPROVED" && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {data.status}
                </span>
              )}
              {data.status === "REJECTED" && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {data.status}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    Registration Number
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {data.registrationNumber}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    Hospital Type
                  </label>
                  <p className="text-sm text-gray-900 mt-1">General Hospital</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    {data.city}
                  </label>
                  <p className="text-sm text-gray-900 mt-1">New York</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    Submitted Date
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {data.submittedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information & Hospital Address */}
          <div className="grid grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                {/* <div>
                  <label className="text-xs font-medium text-gray-500">
                    Contact Person
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {}
                  </p>
                </div> */}
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Official Email
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {data.officialEmail}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Phone Number
                  </label>
                  <p className="text-sm text-gray-900 mt-1">{data.phone}</p>
                </div>
              </div>
            </div>

            {/* Hospital Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Hospital Address
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Full Address
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {data.hospitalAddress}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      City
                    </label>
                    <p className="text-sm text-gray-900 mt-1">{data.city}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      {data.state}
                    </label>
                    <p className="text-sm text-gray-900 mt-1">New York</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Verification */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Document Verification
            </h3>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Hospital License Document
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF Document</p>
                </div>
                <FileText className="w-8 h-8 text-red-500" />
              </div>

              <a
                href={data.licenseDocumentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                View Fullscreen
              </a>
            </div>
          </div>

          {/* Verification Checklist */}
          {data.status === "PENDING" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Verification Checklist
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checklist.licenseVerified}
                    onChange={() => handleChecklistChange("licenseVerified")}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    License Verified
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checklist.registrationVerified}
                    onChange={() =>
                      handleChecklistChange("registrationVerified")
                    }
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    Registration Number Validated
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checklist.contactVerified}
                    onChange={() => handleChecklistChange("contactVerified")}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    Contact Email Verified
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checklist.phoneVerified}
                    onChange={() => handleChecklistChange("phoneVerified")}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    Phone Number Verified
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checklist.addressVerified}
                    onChange={() => handleChecklistChange("addressVerified")}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    Address Verified
                  </span>
                </label>
              </div>
            </div>
          )}
          {/* Internal Verification Notes */}
          {data.status === "PENDING" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Internal Verification Notes
              </h3>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Enter internal comments for audit reference..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
            </div>
          )}

          {data.status !== "PENDING" && data.adminRemarks && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Internal Verification Notes
              </h3>
              <p>{data.adminRemarks}</p>
            </div>
          )}

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                All verification actions are permanently recorded in the Audit
                Trail
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Action Buttons */}
        {data.status === "PENDING" && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="max-w-5xl mx-auto flex items-center justify-end gap-3">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Reject Application
              </button>
              <button
                onClick={handleApprove}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Approve & Create Hospital Owner
              </button>
            </div>
          </div>
        )}

        {/* Bottom Spacer for Fixed Buttons */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default HospitalVerificationReview;
