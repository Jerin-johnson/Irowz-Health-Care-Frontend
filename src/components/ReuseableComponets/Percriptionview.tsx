import React from "react";
import { format } from "date-fns";
import { X, Calendar, Download } from "lucide-react";

interface Prescription {
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

interface LabTest {
  testName: string;
  description?: string;
  reportUrl?: string;
  status: "ORDERED" | "RECEIVED";
}

interface MedicalRecord {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  hospitalId?: string;
  visitType: "OPD" | "ONLINE";
  visitDate: Date;
  diagnosisSummary?: string;
  observationNotes?: string;
  clinicalObservations?: string;
  prescriptions: Prescription[];
  labTests: LabTest[];
  followUpDate?: Date;
  status: "DRAFT" | "COMPLETED" | "LOCKED";
  externalUpload: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface DoctorInfo {
  name: string;
  specialization: string;
  registrationNumber: string;
  hospital: string;
}

interface PrescriptionViewProps {
  medicalRecord: MedicalRecord;
  doctorInfo: DoctorInfo;
  onDownload?: () => void;
  onClose?: () => void;
}

// Utility function to parse frequency into morning, afternoon, night
const parseFrequency = (
  frequency: string,
): { morning: boolean; afternoon: boolean; night: boolean } => {
  const lower = frequency.toLowerCase();

  // Default pattern for common frequencies
  if (lower.includes("m") || lower === "1-0-0") {
    return { morning: true, afternoon: false, night: false };
  }
  if (lower.includes("twice") || lower === "1-0-1") {
    return { morning: true, afternoon: false, night: true };
  }
  if (lower.includes("thrice") || lower === "1-1-1") {
    return { morning: true, afternoon: true, night: true };
  }
  if (lower === "0-1-0") {
    return { morning: false, afternoon: true, night: false };
  }
  if (lower === "0-0-1") {
    return { morning: false, afternoon: false, night: true };
  }
  if (lower === "1-1-0") {
    return { morning: true, afternoon: true, night: false };
  }
  if (lower === "0-1-1") {
    return { morning: false, afternoon: true, night: true };
  }

  // Default to all times if unclear
  return { morning: true, afternoon: true, night: true };
};

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex gap-2 text-sm">
    <span className="text-gray-600 font-medium min-w-[140px]">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

const DoseIndicator: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="flex justify-center">
    <div
      className={`w-5 h-5 rounded flex items-center justify-center ${
        isActive ? "bg-blue-500" : "bg-gray-200"
      }`}
    >
      {isActive && <span className="text-white text-xs font-bold">✓</span>}
    </div>
  </div>
);

const MedicationRow: React.FC<{ prescription: Prescription }> = ({
  prescription,
}) => {
  const doses = parseFrequency(prescription.frequency);

  return (
    <div className="grid grid-cols-6 gap-3 px-3 py-4 border-b border-gray-100 last:border-b-0 items-center text-sm">
      <div className="col-span-1">
        <div className="font-semibold text-gray-900">
          {prescription.medicineName}
        </div>
        <div className="text-xs text-gray-500 mt-1">{prescription.dosage}</div>
      </div>
      <DoseIndicator isActive={doses.morning} />
      <DoseIndicator isActive={doses.afternoon} />
      <DoseIndicator isActive={doses.night} />
      <div className="text-gray-700">{prescription.duration}</div>
      <div className="text-gray-700">{prescription.instructions || "-"}</div>
    </div>
  );
};

const PrescriptionView: React.FC<PrescriptionViewProps> = ({
  medicalRecord,
  doctorInfo,
  onDownload,
  onClose,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Prescription Details
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          )}
        </div>

        {/* Doctor Information */}
        <section className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-700 mb-4">
            Doctor Information
          </h3>
          <div className="space-y-3">
            <InfoRow label="Dr." value={doctorInfo.name} />
            <InfoRow label="Reg No" value={doctorInfo.registrationNumber} />
            <InfoRow label="Specialization" value={doctorInfo.specialization} />
            <InfoRow label="Hospital" value={doctorInfo.hospital} />
            <InfoRow
              label="Location/Date"
              value={format(new Date(medicalRecord.visitDate), "MMMM d, yyyy")}
            />
          </div>
        </section>

        {/* Diagnosis */}
        {medicalRecord.diagnosisSummary && (
          <section className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-700 mb-4">
              Diagnosis
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {medicalRecord.diagnosisSummary}
            </p>
          </section>
        )}

        {/* Prescribed Medications */}
        {medicalRecord.prescriptions.length > 0 && (
          <section className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-700 mb-4">
              Prescribed Medications
            </h3>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Table Header */}
                <div className="grid grid-cols-6 gap-3 px-3 py-3 bg-gray-50 rounded-lg text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  <div>Medicine Name</div>
                  <div className="text-center">Morning</div>
                  <div className="text-center">Afternoon</div>
                  <div className="text-center">Night</div>
                  <div>Duration</div>
                  <div>Instructions</div>
                </div>
                {/* Table Body */}
                <div className="bg-white">
                  {medicalRecord.prescriptions.map((prescription, index) => (
                    <MedicationRow key={index} prescription={prescription} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* General Advice */}
        {medicalRecord.observationNotes && (
          <section className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-700 mb-4">
              General Advice
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              {medicalRecord.observationNotes
                .split("\n")
                .map(
                  (note, index) =>
                    note.trim() && <li key={index}>{note.trim()}</li>,
                )}
            </ul>
          </section>
        )}

        {/* Follow-up Date */}
        {medicalRecord.followUpDate && (
          <section className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-700 mb-4">
              Follow-up Date
            </h3>
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {format(new Date(medicalRecord.followUpDate), "MMMM d, yyyy")}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                Hypertension period
              </span>
            </div>
          </section>
        )}

        {/* Action Buttons */}
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
    </div>
  );
};

export default PrescriptionView;
