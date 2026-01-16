import z from "zod";

export const patientProfileSchema = z.object({
  fullName: z.string().min(2),
  mobile: z.string().min(8),
  dateOfBirth: z.string().min(1),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodGroup: z.string(),
  height: z.coerce.number().min(30),
  weight: z.coerce.number().min(10),
  state: z.string(),
  city: z.string(),
  pincode: z.string(),
  address: z.string(),
  email: z.string().email(),
});
