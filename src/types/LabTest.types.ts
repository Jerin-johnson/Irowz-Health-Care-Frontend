export interface LabTest {
  testName: string;
  description: string;
  action: string;
  status: string;
  orderedAt: string;
  reportUrl: string;
  uploadedAt: string;
}

export interface LabOrderData {
  medicalRecordId: string;
  labTests: LabTest[];
}

export interface LabOrderResponse {
  success: boolean;
  message: string;
  data: LabOrderData;
}
