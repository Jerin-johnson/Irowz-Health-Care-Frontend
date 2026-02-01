import { z } from "zod";

export const medicationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Medicine is required"),
  dosage: z.string().min(1, "Dosage required"),
  dosageUnit: z.enum(["M", "A", "N", "M & A", "M & A & N", "M & N"]),
  duration: z.number().min(1),
  durationUnit: z.enum(["Days", "Weeks"]),
  instructions: z.string().min(1),
});

// export const medicationSchema = z.object({
//   id: z.string(),
//   name: z.string().min(1),

//   dosage: z.string().min(1),

//   frequency: z.enum(["OD", "BD", "TDS"]),
//   // OD = once
//   // BD = twice
//   // TDS = thrice

//   timings: z.array(z.enum(["M", "A", "N"])),

//   duration: z.number().min(1),
//   durationUnit: z.enum(["Days", "Weeks"]),

//   instructions: z.string().min(1),
// });

export const prescriptionSchema = z.object({
  primaryDiagnosis: z.string().min(10, "Primary diagnosis is required"),
  clinicalObservations: z.string().optional(),
  medications: z.array(medicationSchema).optional(),
  generalAdvice: z.string().optional(),
  followUpDate: z.string().optional(),
});

export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;
