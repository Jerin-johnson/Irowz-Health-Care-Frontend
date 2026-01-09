import { z } from "zod";

export const billingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP Code is required"),
  phone: z.string().min(8, "Phone number is required"),
  email: z.string().email("Invalid email"),
  companyName: z.string().optional(),
  apartment: z.string().optional(),
  orderNotes: z.string().optional(),
});

export type BillingFormValues = z.infer<typeof billingSchema>;
