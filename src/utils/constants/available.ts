import type { LabTest } from "../../types/doctor/doctor.consulation.types";

export const availableTests: LabTest[] = [
  { id: "4", name: "Thyroid Function Test", category: "Endocrinology" },
  { id: "5", name: "Liver Function Test", category: "Biochemistry" },
  { id: "6", name: "Kidney Function Test", category: "Biochemistry" },
  { id: "7", name: "Urine Routine", category: "Pathology" },
  { id: "8", name: "ECG", category: "Cardiology" },
  { id: "9", name: "X-Ray", category: "Radiology" },
];
