import { api } from "../../axios.config";

export const fetchHospitalPlans = async () => {
  const res = await api.get("/hospital-admin/subscription/plans");
  return res.data.data;
};

//  create razorpay order
export const createSubscriptionOrder = async (planId: string) => {
  const res = await api.post("/hospital/subscriptions/order", { planId });
  return res.data;
};

//  confirm payment
export const confirmSubscriptionPayment = async (payload: {
  planId: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}) => {
  const res = await api.post("/hospital/subscriptions/confirm", payload);
  return res.data;
};
