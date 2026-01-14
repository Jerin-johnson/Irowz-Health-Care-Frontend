import type { BillingFormValues } from "../../../validators/checkoutDoctorBooking";
import { api } from "../../axios.config";

export const fetchPatientBasicDetailsBeforeCheckout = async (
  doctorId: string
) => {
  const res = await api.get(`/patient/checkout/profile`, {
    params: {
      doctorId,
    },
  });

  return res.data.data;
};

export interface CheckoutPayload {
  doctorId: string;
  date: string;
  startTime: string;
  billingDetails: BillingFormValues;
  paymentMethod: string;
}

export const checkoutDoctorBooking = async (payload: CheckoutPayload) => {
  const res = await api.post("/patient/checkout", payload);
  return res.data.data;
};

export interface verifyDoctorPaymentPayload {
  appointmentId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export const verifyDoctorPayment = async (
  payload: verifyDoctorPaymentPayload
) => {
  const res = await api.post("/patient/payment/verify", payload);
  return res.data;
};

export const successAppoinmentBooking = async (id: string) => {
  const res = await api.get(`/patient/appointment/success/${id}`);
  console.log("The response is", res);
  return res.data.data;
};
