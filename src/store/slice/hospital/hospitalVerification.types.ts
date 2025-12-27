export type VerificationStatus =
  | "NOT_SUBMITTED"
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface HospitalVerificationState {
  verificationId: string | null;
  status: VerificationStatus;
  adminRemarks: string | null;

  loading: boolean;
  error: string | null;
  name?: string | null;
  register_no?: string | null;
  city?: string | null;
  email?: string | null;
}
