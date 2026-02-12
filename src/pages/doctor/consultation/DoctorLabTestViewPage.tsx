import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { LabOrderData } from "../../../types/LabTest.types";
import { useNavigate, useParams } from "react-router-dom";
import LabOrderView from "../../../components/ReuseableComponets/LabTestView";
import { fetchLabTestOfMedicalRecordApi } from "../../../api/apiService/doctor/doctor.consultation";
import { getSignedUrlApi } from "../../../api/apiService/privateFile/GetsignedUrl";
import { notify } from "../../../shared/notification/toast";

const DoctorLabOrderViewPage: React.FC = () => {
  const { id: recordId } = useParams();

  const navigate = useNavigate();

  const { data, isPending, error, refetch } = useQuery<LabOrderData>({
    queryKey: ["consutlation:lab:tests", recordId],
    queryFn: () => fetchLabTestOfMedicalRecordApi(recordId!),
  });

  const handleViewReport = async (reportUrl: string) => {
    try {
      const data = await getSignedUrlApi(reportUrl);
      if (data.signedUrl) {
        window.open(data.signedUrl, "_blank", "noopener,noreferrer");
      } else {
        notify.error("No signed URL received");
      }
    } catch (err) {
      console.error("Error viewing report:", err);
      notify.error("Failed to open report. Please try again.");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading lab orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold">Error</h3>
          </div>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {data.medicalRecordId && (
          <div className="mb-6 bg-white rounded-lg shadow-sm px-6 py-4">
            <p className="text-sm text-gray-600">
              Medical Record ID:{" "}
              <span className="font-semibold text-gray-900">
                {data.medicalRecordId}
              </span>
            </p>
          </div>
        )}

        <LabOrderView
          labTests={data.labTests}
          onViewReport={handleViewReport}
          onClose={() => navigate(-1)}
          onDownload={() => console.log("download invokded")}
        />
      </div>
    </div>
  );
};

export default DoctorLabOrderViewPage;
