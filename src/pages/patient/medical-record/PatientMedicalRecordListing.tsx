import type React from "react";
import MedicalHistoryTab from "../../../components/doctor/consulation/tabs/MedicalHistoryTab";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPatientMedicalRecordAPi } from "../../../api/apiService/patient/MedicalRecord";
import { useDebounce } from "../../../hooks/common/useDebounce";
import { useNavigate } from "react-router-dom";

const PatientMedicalRecordListingPage: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pageMedical, setPageMedical] = useState(1);
  const [diagnosisKeyword, setDiagnosisKeyword] = useState("");

  const navigate = useNavigate();

  const debouncedDiagnosisKeyword = useDebounce(diagnosisKeyword, 300);

  const { data, isFetching } = useQuery({
    queryKey: ["medical-records", debouncedDiagnosisKeyword, pageMedical],
    queryFn: () =>
      fetchPatientMedicalRecordAPi(
        debouncedDiagnosisKeyword,
        pageMedical,
        limit,
      ),
  });

  const medicalRecords = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  const limit = 4;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Medical Records
          </h1>
          <p className="text-gray-600">View and manage your medical Records</p>
        </header>

        <div className="space-y-4">
          <MedicalHistoryTab
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            diagnosisKeyword={diagnosisKeyword}
            setDiagnosisKeyword={setDiagnosisKeyword}
            records={medicalRecords}
            currentPage={pageMedical}
            totalPages={totalPages}
            onPageChange={setPageMedical}
            isFetching={isFetching}
            onClickViewLabReports={(id) =>
              navigate(`/patient/medical-record/lab/${id}`)
            }
            onClickViewPrecription={(id) => {
              navigate(`/patient/medical-record/prescription/${id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalRecordListingPage;
