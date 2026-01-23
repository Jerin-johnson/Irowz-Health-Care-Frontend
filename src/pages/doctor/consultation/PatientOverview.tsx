import React, { useCallback, useMemo, useState } from "react";
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

const patient: Patient = {
  id: "001",
  fullName: "Michael Anderson",
  age: 42,
  gender: "Male",
  bloodGroup: "O+",
  height: 175,
  weight: 78,
  bmi: 25.4,
  bp: "120/80 mmHg",
  phone: "+1 555 0123",
  email: "m.anderson@email.com",
  city: "New York",
  allergies: ["Penicillin", "Sulfa drugs"],
  chronicConditions: ["Type 2 Diabetes", "Hypertension"],
  visitType: "OPD Visit",
  visitTime: "10:30 AM",
  queue: 87,
  status: "Consultation",
};

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

const availableTests: LabTest[] = [
  { id: "4", name: "Thyroid Function Test", category: "Endocrinology" },
  { id: "5", name: "Liver Function Test", category: "Biochemistry" },
  { id: "6", name: "Kidney Function Test", category: "Biochemistry" },
  { id: "7", name: "Urine Routine", category: "Pathology" },
  { id: "8", name: "ECG", category: "Cardiology" },
  { id: "9", name: "X-Ray", category: "Radiology" },
];

const tabs: { id: TabType; label: string }[] = [
  { id: "overview", label: "Patient Overview" },
  { id: "history", label: "Medical History" },
  { id: "prescription", label: "Today's Prescription" },
  { id: "labs", label: "Order Lab Tests" },
];

/* =========================
   PAGE COMPONENT
   ========================= */

const PatientConsultationOverView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  /* -------- Medical History -------- */
  const [dateRange, setDateRange] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [diagnosisKeyword, setDiagnosisKeyword] = useState("");

  /* -------- Prescription -------- */
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("");
  const [clinicalObservations, setClinicalObservations] = useState("");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [generalAdvice, setGeneralAdvice] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  /* -------- Lab Tests -------- */
  const [selectedTests, setSelectedTests] = useState<LabTest[]>([]);
  const [testSearch, setTestSearch] = useState("");
  const [priority, setPriority] = useState<"normal" | "urgent">("normal");
  const [clinicalReason, setClinicalReason] = useState("");

  /* -------- Notes -------- */
  const [notes, setNotes] = useState("");

  /* =========================
     COMMAND-BASED ACTIONS
     ========================= */

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

  /* =========================
     TAB RENDERING
     ========================= */

  const renderedTab = useMemo(() => {
    switch (activeTab) {
      case "overview":
        return (
          <PatientOverviewTab
            patient={patient}
            notes={notes}
            setNotes={setNotes}
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
  }, [
    activeTab,
    notes,
    dateRange,
    selectedDoctor,
    diagnosisKeyword,
    primaryDiagnosis,
    clinicalObservations,
    medications,
    generalAdvice,
    followUpDate,
    selectedTests,
    testSearch,
    priority,
    clinicalReason,
    addMedication,
    updateMedication,
    removeMedication,
    addTest,
    removeTest,
  ]);

  /* =========================
     RENDER
     ========================= */

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
                  {patient.fullName}
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
        <div>{renderedTab}</div>

        {/* Footer Action */}
        {activeTab !== "overview" && (
          <div className="mt-6 flex justify-end">
            <Button variant="success" icon={<Plus className="w-4 h-4" />}>
              Complete Consultation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientConsultationOverView;
