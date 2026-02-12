import React, { useCallback, useEffect, useState } from "react";
import { User, Clock } from "lucide-react";
import type {
  LabTest,
  MedicalRecord,
  Patient,
  TabType,
} from "../../../types/doctor/doctor.consulation.types";
import Button from "../../../components/doctor/consulation/common/Button";
import Badge from "../../../components/doctor/consulation/common/Badge.2";
import Card from "../../../components/doctor/consulation/common/Card";
import PatientOverviewTab from "../../../components/doctor/consulation/tabs/PatientOverView";
import MedicalHistoryTab from "../../../components/doctor/consulation/tabs/MedicalHistoryTab";
import PrescriptionTab from "../../../components/doctor/consulation/tabs/Percription.tab";
import LabTestsTab from "../../../components/doctor/consulation/tabs/LabtestTab";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { availableTests } from "../../../utils/constants/available";
import { notify } from "../../../shared/notification/toast";
import { useDoctorOnlineConsultationSocket } from "../../../hooks/doctor/consultation/online/useDoctorOnlineConsultationSocket";
import DoctorWaitingForPatient from "../../../components/onlineVideo/doctor/DoctorWaitingForPatient";
import DoctorZegoVideoRoom from "../../../components/onlineVideo/doctor/DoctorZegoVideoRoom";
import { useRingtone } from "../../../hooks/sound/RingTone";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  prescriptionSchema,
  type PrescriptionFormValues,
} from "../../../validators/doctor/consultation/Percription";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../../hooks/common/useDebounce";
import { usePatientProfile } from "../../../hooks/doctor/consultation/useConsultationPatient";
import { useMedicalHistory } from "../../../hooks/doctor/consultation/useMedicalHistory";
import { useConsultationMutations } from "../../../hooks/doctor/consultation/useConsultationActions";

const tabs: { id: TabType; label: string }[] = [
  { id: "overview", label: "Patient Overview" },
  { id: "history", label: "Medical History" },
  { id: "prescription", label: "Today's Prescription" },
  { id: "labs", label: "Order Lab Tests" },
];

export interface Pagination {
  total: number;
  page: number;
  limit: number;
}

export interface MedicalHistoryResponse {
  data: MedicalRecord[];
  pagination: Pagination;
}

const PatientConsultationOverView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pageMedical, setPageMedical] = useState(1);
  const limit = 4;

  const [diagnosisKeyword, setDiagnosisKeyword] = useState("");

  const prescriptionForm = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      primaryDiagnosis: "",
      clinicalObservations: "",
      medications: [],
      generalAdvice: "",
      followUpDate: "",
    },
  });

  const [selectedTests, setSelectedTests] = useState<LabTest[]>([]);
  const [testSearch, setTestSearch] = useState("");
  const [action, setAction] = useState<"Hospital" | "Outside">("Hospital");
  const [clinicalReason, setClinicalReason] = useState("");

  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const patientId = useAppSelector(
    (state) => state.doctorConsultation.patientId,
  );

  const doctorId = useAppSelector((state) => state.auth.doctorId);

  const { id: appointmentId } = useParams();

  const { consultationId, status } = useDoctorOnlineConsultationSocket(
    doctorId as string,
  );

  //fetching inital patient profile
  const { data: patient, isPending } = usePatientProfile(
    appointmentId,
    patientId,
  );

  useRingtone(status === "CALLING" && patient?.visitType === "ONLINE");

  const debouncedDiagnosisKeyword = useDebounce(diagnosisKeyword, 300);

  const { data, isFetching } = useMedicalHistory(
    appointmentId,
    patientId,
    debouncedDiagnosisKeyword,
    pageMedical,
    limit,
  );

  const medicalRecords = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  const {
    compelteConsulationMutate,
    saveNoteMutateFn,
    PrescriptionMutate,
    createLabOrderMutation,
  } = useConsultationMutations();

  //handlers

  function handleCreateLabOrder() {
    if (!selectedTests.length) {
      return notify.error("Please select at least one lab test");
    }

    console.log({
      appointmentId: appointmentId!,
      tests: selectedTests,
      action,
      clinicalReason,
    });

    createLabOrderMutation.mutate({
      appointmentId: appointmentId!,
      tests: selectedTests,
      action,
      clinicalReason,
    });
  }

  function handleSaveObservationNote() {
    if (!notes) {
      notify.error("please mark Qucik observation first");
      return;
    }
    saveNoteMutateFn.mutate({
      id: appointmentId as string,
      observationNote: notes,
    });
  }

  function savePercriptionHandler(data: PrescriptionFormValues) {
    PrescriptionMutate.mutate({ id: appointmentId!, data });
  }

  function completeConsulation() {
    if (notes.length < 3) {
      return notify.error("The observation note is required");
    }

    // if (!primaryDiagnosis) {
    //   return notify.error("The primary diginose is required");
    // }
    compelteConsulationMutate.mutate(appointmentId!);
    console.log("The compelete consulation is called");
  }

  const addTest = useCallback((test: LabTest) => {
    setSelectedTests((prev) =>
      prev.find((t) => t.id === test.id) ? prev : [...prev, test],
    );
  }, []);

  const removeTest = useCallback((id: string) => {
    setSelectedTests((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (prescriptionForm.formState.isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [prescriptionForm.formState.isDirty]);

  const renderedTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <PatientOverviewTab
            patient={patient as Patient}
            notes={notes}
            setNotes={setNotes}
            handleSaveObservationNote={handleSaveObservationNote}
          />
        );

      case "history":
        return (
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
            onClickViewPrecription={(id?: string) =>
              navigate(`/doctor/prescription/view/${id}`)
            }
            onClickViewLabReports={(id?: string) => {
              navigate(`/doctor/lab-report/view/${id}`);
            }}
          />
        );

      case "prescription":
        return (
          <PrescriptionTab
            form={prescriptionForm}
            onSave={savePercriptionHandler}
          />
        );

      case "labs":
        return (
          <LabTestsTab
            selectedTests={selectedTests}
            addTest={addTest}
            removeTest={removeTest}
            availableTests={availableTests}
            testSearch={testSearch}
            setTestSearch={setTestSearch}
            action={action}
            setAction={setAction}
            clinicalReason={clinicalReason}
            setClinicalReason={setClinicalReason}
            handleCreateLabOrder={handleCreateLabOrder}
            isCreating={createLabOrderMutation.isPending}
          />
        );
    }
  };

  if (isPending) {
    return <div>Loading</div>;
  }

  if (!patient) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {patient?.fullName || ""}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>
                    {patient?.age || "not Updated"} Years / {patient?.gender}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {patient?.bloodGroup}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {patient?.visitTime}
                </span>
              </div>
              <div className="flex items-center justify-end gap-3">
                <Badge variant="blue">{patient?.visitType}</Badge>
                <Badge variant="gray">Queue {patient?.queue}</Badge>
                <Badge variant="green">{patient?.status}</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Card className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </Card>

        {/* Content */}
        <div>{renderedTab()}</div>

        {/* Footer Action */}
        {/* {activeTab !== "overview" && ( */}
        <div className="mt-6 flex justify-end">
          <Button variant="success" onClick={completeConsulation}>
            Complete Consultation
          </Button>
        </div>
        {/* )} */}

        {patient?.visitType === "ONLINE" && (
          <div className="bg-white rounded-xl shadow-sm border p-4 h-[80vh]">
            {status === "CALLING" && (
              <DoctorWaitingForPatient
                onCancel={() => console.log("The canceled is called")}
              />
            )}

            {status === "IN_PROGRESS" && consultationId && (
              <div className="mt-6 h-[600px] w-full rounded-xl overflow-hidden border">
                <DoctorZegoVideoRoom consultationId={consultationId} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientConsultationOverView;
