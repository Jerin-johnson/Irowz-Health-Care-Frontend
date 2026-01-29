import { z } from "zod";

export const MedicationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Medicine name is required"),
  dosage: z
    .string()
    .min(1, "Dosage is required")
    .refine((v) => Number(v) > 0, "Dosage must be greater than 0"),
  dosageUnit: z.enum(["M", "A", "N"]),
  duration: z.number().min(1, "Duration must be at least 1"),
  durationUnit: z.enum(["Days", "Weeks"]),
  instructions: z.string().min(1),
});

export const PrescriptionSchema = z.object({
  appointmentId: z.string(),
  primaryDiagnosis: z
    .string()
    .min(200, "Primary diagnosis must be at least 200 characters"),
  clinicalObservations: z.string().optional(),
  medications: z
    .array(MedicationSchema)
    .min(1, "At least one medicine is required"),
  generalAdvice: z.string().optional(),
  followUpDate: z.string().optional(),
});
