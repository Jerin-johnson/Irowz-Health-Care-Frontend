import { z } from "zod";

export const hospitalVerificationSchema = z.object({
  hospitalName: z.string().min(3, "Hospital name is required"),
  registrationNumber: z.string().min(3, "Registration number is required"),
  hospitalAddress: z.string().min(5, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  officialEmail: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Phone number is invalid"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  licenseDocument: z.instanceof(File, {
    message: "License document is required",
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});
