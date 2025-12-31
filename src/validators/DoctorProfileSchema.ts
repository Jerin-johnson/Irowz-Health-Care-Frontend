import { z } from "zod";

export const doctorProfileSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),

  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),

  bio: z
    .string()
    .min(20, "Bio must be at least 20 characters")
    .max(500, "Bio cannot exceed 500 characters"),

  experienceYears: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(60, "Invalid experience"),

  consultationFee: z.number().min(0, "Fee must be positive"),
});
