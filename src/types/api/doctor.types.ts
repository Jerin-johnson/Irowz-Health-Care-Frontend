export interface DoctorApiItem {
  id: string;
  fullName: string;
  email: string;
  profileImage?: string;
  specialtyId: string;
  consultationFee: number;
  experienceYears: number;
  averageRating: number;
  totalReviews: number;
  hospitalName: string;
  hospitalCity: string;
  specialtyName: string;
  isAvailableToday: boolean;
  availableDays: string[];
  distance?: number;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DoctorApiResponse {
  items: DoctorApiItem[];
  pagination: PaginationInfo;
}
