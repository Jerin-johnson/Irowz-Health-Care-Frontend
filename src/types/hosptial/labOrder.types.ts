export interface Patient {
  _id: string;
  name: string;
}

export interface Test {
  _id: string;
  testName: string;
  category: string;
}

export interface LabOrder {
  _id: string;
  appointmentId: string;
  patientId: Patient;
  doctorId: string;
  hospitalId: string;
  tests: Test[];
  clinicalReason: string;
  status: "PENDING" | "RESULT_UPLOADED";
  createdAt: string;
  updatedAt: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LabOrdersApiResponse {
  success: boolean;
  message: string;
  data: {
    data: LabOrder[];
    pagination: PaginationData;
  };
}
