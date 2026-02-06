import React from "react";
import SubscriptionPlans from "../../../components/common/SubcriptionPlanListing";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  confirmSubscriptionPayment,
  createSubscriptionOrder,
  fetchHospitalPlans,
} from "../../../api/apiService/hospitalAdmin/Subscription";
import { openRazorpayCheckout } from "../../../services/payment/razorpay.service";

interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  durationInDays: number;
  doctorLimit: number;
  features: string[];
  isActive: boolean;
}

interface ApiResponse {
  plans: SubscriptionPlan[];
  activePlanId: string;
}

const HospitalAdminSubscriptionListing: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["hospital-plans"],
    queryFn: fetchHospitalPlans,
  });

  const createOrderMutation = useMutation({
    mutationFn: createSubscriptionOrder,
    onError: () => toast.error("Failed to start payment"),
  });

  //  Confirm payment after success
  const confirmPaymentMutation = useMutation({
    mutationFn: confirmSubscriptionPayment,
    onSuccess: () => {
      toast.success("Subscription activated!");
      queryClient.invalidateQueries({ queryKey: ["hospital-plans"] });
    },
    onError: () => toast.error("Payment verification failed"),
  });

  const handleSubscribe = async (planId: string, amount: number) => {
    try {
      //  Create order from backend
      const order = await createOrderMutation.mutateAsync(planId);

      console.log("The order is ", order);

      //  Open Razorpay checkout
      openRazorpayCheckout({
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Hospital Subscription",
        description: "Subscription plan purchase",

        onSuccess: (response) => {
          confirmPaymentMutation.mutate({
            planId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        },

        onDismiss: () => {
          toast("Payment cancelled");
        },
      });
    } catch {
      toast.error("Unable to start checkout");
    }
  };

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const plans = data.plans;
  const currentPlanId = data.activePlanId;

  return (
    <div className="min-h-screen bg-gray-50">
      <SubscriptionPlans
        plans={plans}
        currentPlanId={currentPlanId}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default HospitalAdminSubscriptionListing;
