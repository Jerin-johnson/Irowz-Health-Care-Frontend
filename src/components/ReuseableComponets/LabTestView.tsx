import React from "react";
import type { LabTest } from "../../types/LabTest.types";
import { Download } from "lucide-react";

interface LabOrderViewProps {
  labTests: LabTest[];
  onViewReport: (reportUrl: string) => void;
  onDownload?: () => void;
  onClose?: () => void;
}

const LabOrderView: React.FC<LabOrderViewProps> = ({
  labTests,
  onViewReport,
  onClose,
  onDownload,
}) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "RESULT_UPLOADED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <h2 className="text-2xl font-bold text-white">Lab Test Orders</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {labTests.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-4 text-gray-500">No lab tests found</p>
            </div>
          ) : (
            labTests.map((test, index) => (
              <div
                key={index}
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {test.testName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          test.status,
                        )}`}
                      >
                        {test.status.replace("_", " ")}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      {test.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span>{test.action}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Ordered: {formatDate(test.orderedAt)}</span>
                      </div>

                      {test.uploadedAt && (
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Uploaded: {formatDate(test.uploadedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ml-4">
                    {test.status === "RESULT_UPLOADED" && test.reportUrl && (
                      <button
                        onClick={() => onViewReport(test.reportUrl)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 font-medium text-sm flex items-center gap-2 shadow-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Report
                      </button>
                    )}
                  </div>

                  <div className="ml-4">
                    {test?.action.toLowerCase() != "hospital" &&
                      !test.reportUrl && (
                        <button
                          onClick={() => onViewReport(test.reportUrl)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 font-medium text-sm flex items-center gap-2 shadow-sm"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Upload Report
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex gap-3 px-6 py-5 bg-gray-50 justify-end">
        {onDownload && (
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default LabOrderView;
