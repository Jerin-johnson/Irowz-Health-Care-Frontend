import React, { useCallback, useState } from "react";
import { User, Clock, Plus } from "lucide-react";

import type {
  LabTest,
  MedicalRecord,
  Medication,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../../store/hooks";
import {
  compelteConsulationAPi,
  fetchConsulationPatientProfile,
  saveDoctorQuickObservation,
} from "../../../api/apiService/doctor/doctor.consultation";
import { useNavigate, useParams } from "react-router-dom";
import { availableTests } from "../../../utils/constants/available";
import { notify } from "../../../shared/notification/toast";
import { useDoctorOnlineConsultationSocket } from "../../../hooks/doctor/consultation/online/useDoctorOnlineConsultationSocket";
import DoctorWaitingForPatient from "../../../components/onlineVideo/doctor/DoctorWaitingForPatient";
import DoctorZegoVideoRoom from "../../../components/onlineVideo/doctor/DoctorZegoVideoRoom";
import { useRingtone } from "../../../hooks/sound/RingTone";

const medicalRecords: MedicalRecord[] = [
  {
    id: "1",
    date: "Dec 1, 2024",
    doctorName: "Dr. Sarah Mitchell",
    diagnosisSummary: "Hypertension follow-up, chest pain evaluation",
    visitType: "OPD Visit",
  },
  {
    id: "2",
    date: "Nov 15, 2024",
    doctorName: "Dr. James Wilson",
    diagnosisSummary: "Routine cardiac checkup, medication review",
    visitType: "Teleconsult",
  },
  {
    id: "3",
    date: "Oct 20, 2024",
    doctorName: "Dr. Emily Chen",
    diagnosisSummary: "Acute chest pain, emergency evaluation",
    visitType: "OPD Visit",
  },
];

const tabs: { id: TabType; label: string }[] = [
  { id: "overview", label: "Patient Overview" },
  { id: "history", label: "Medical History" },
  { id: "prescription", label: "Today's Prescription" },
  { id: "labs", label: "Order Lab Tests" },
];

const PatientConsultationOverView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const [dateRange, setDateRange] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [diagnosisKeyword, setDiagnosisKeyword] = useState("");

  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("");
  const [clinicalObservations, setClinicalObservations] = useState("");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [generalAdvice, setGeneralAdvice] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const [selectedTests, setSelectedTests] = useState<LabTest[]>([]);
  const [testSearch, setTestSearch] = useState("");
  const [priority, setPriority] = useState<"normal" | "urgent">("normal");
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

  useRingtone(status === "CALLING");

  const addMedication = useCallback(() => {
    setMedications((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        dosage: "",
        dosageUnit: "M",
        duration: 7,
        durationUnit: "Days",
        instructions: "After food",
      },
    ]);
  }, []);

  //fetching inital patient profile
  const { data: patient, isPending } = useQuery<Patient>({
    queryKey: ["doctor:consulation:patient:overview", patientId],
    queryFn: () => fetchConsulationPatientProfile(appointmentId as string),
    enabled: !!appointmentId,
  });

  const compelteConsulationMutate = useMutation({
    mutationFn: compelteConsulationAPi,
    onSuccess: () => {
      notify.success("The patient consulation has comepleted successfully");
      navigate("/doctor/queue");
    },
    onError: (error) => {
      notify.error(error.message);
      console.log(error);
    },
  });
  //save note
  const saveNoteMutateFn = useMutation({
    mutationFn: ({
      id,
      observationNote,
    }: {
      id: string;
      observationNote: string;
    }) => saveDoctorQuickObservation(id, observationNote),

    onSuccess: () => {
      notify.success("percription saved succcessfully");
    },
  });

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

  console.log("The patient id is", patient);

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

  const removeMedication = useCallback((id: string) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateMedication = useCallback(
    (id: string, field: keyof Medication, value: any) => {
      setMedications((prev) =>
        prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
      );
    },
    [],
  );

  const addTest = useCallback((test: LabTest) => {
    setSelectedTests((prev) =>
      prev.find((t) => t.id === test.id) ? prev : [...prev, test],
    );
  }, []);

  const removeTest = useCallback((id: string) => {
    setSelectedTests((prev) => prev.filter((t) => t.id !== id));
  }, []);

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
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            diagnosisKeyword={diagnosisKeyword}
            setDiagnosisKeyword={setDiagnosisKeyword}
            records={medicalRecords}
          />
        );

      case "prescription":
        return (
          <PrescriptionTab
            primaryDiagnosis={primaryDiagnosis}
            setPrimaryDiagnosis={setPrimaryDiagnosis}
            clinicalObservations={clinicalObservations}
            setClinicalObservations={setClinicalObservations}
            medications={medications}
            addMedication={addMedication}
            updateMedication={updateMedication}
            removeMedication={removeMedication}
            generalAdvice={generalAdvice}
            setGeneralAdvice={setGeneralAdvice}
            followUpDate={followUpDate}
            setFollowUpDate={setFollowUpDate}
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
            priority={priority}
            setPriority={setPriority}
            clinicalReason={clinicalReason}
            setClinicalReason={setClinicalReason}
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
                  {patient?.fullName}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>
                    {patient.age} Years / {patient.gender}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {patient.bloodGroup}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {patient.visitTime}
                </span>
              </div>
              <div className="flex items-center justify-end gap-3">
                <Badge variant="blue">{patient.visitType}</Badge>
                <Badge variant="gray">Queue {patient.queue}</Badge>
                <Badge variant="green">{patient.status}</Badge>
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
