import { z } from "zod";

export const ReApplyhospitalVerificationSchema = z.object({
  hospitalAddress: z.string().min(5, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  licenseDocument: z.instanceof(File, {
    message: "License document is required",
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});
