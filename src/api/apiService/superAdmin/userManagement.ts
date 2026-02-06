/* ---------------- Types ---------------- */

import { api } from "../../axios.config";

export interface FetchUsersParams {
  page: number;
  limit: number;
  role?: string;
  status?: string;
  search?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "PATIENT" | "DOCTOR" | "HOSPITAL_ADMIN";
  isBlocked: boolean;
  isVerified: boolean;
  forcePasswordReset: boolean;
  gender?: string;
  dob?: string;
  profileImage?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface UsersApiResponse {
  success: boolean;
  message: string;
  data: {
    items: User[];
    meta: PaginationMeta;
  };
}

/* ---------------- Fetch ---------------- */

export async function fetchUsersAdmin(
  params: FetchUsersParams,
): Promise<UsersApiResponse> {
  const response = await api.get<UsersApiResponse>("/super-admin/users", {
    params,
  });
  return response.data; // IMPORTANT
}

/* ---------------- Mutations ---------------- */

export async function blockUserAdmin(userId: string): Promise<void> {
  await api.post(`/super-admin/users/${userId}/block`);
}

export async function unblockUserAdmin(userId: string): Promise<void> {
  await api.post(`/super-admin/users/${userId}/unblock`);
}

export async function verifyUserAdmin(userId: string): Promise<void> {
  await api.post(`/super-admin/users/${userId}/verify`);
}
