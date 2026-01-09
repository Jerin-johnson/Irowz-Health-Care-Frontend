import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "../../../store/hooks";
import { useConfirmNavigation } from "../../../hooks/common/useConfirmNavigation";
import {
  checkoutDoctorBooking,
  fetchPatientBasicDetailsBeforeCheckout,
  verifyDoctorPayment,
} from "../../../api/apiService/patient/doctorBooking";
import { unlockDoctorSlot } from "../../../api/apiService/patient/doctorSlots";
import { notify } from "../../../shared/notification/toast";

import InputField from "../../../components/common/InputField";
import {
  billingSchema,
  type BillingFormValues,
} from "../../../validators/checkoutDoctorBooking";
import { openRazorpayCheckout } from "../../../services/payment/razorpay.service";

const DoctorBooking: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useAppSelector((state) => state.auth.userId);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

  const { doctorId, date, startTime } = location.state as {
    doctorId: string;
    date: string;
    startTime: string;
  };

  const [paymentMethod, setPaymentMethod] = useState("");
  const [blockNavigation, setBlockNavigation] = useState(true);

  const { data: billingPrefill } = useQuery({
    queryKey: ["patient:profile:checkout", userId, doctorId],
    enabled: !!userId && !!doctorId,
    queryFn: () => fetchPatientBasicDetailsBeforeCheckout(doctorId),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      companyName: "",
      apartment: "",
      orderNotes: "",
    },
  });

  useEffect(() => {
    if (!billingPrefill) return;

    reset({
      firstName: billingPrefill.firstName ?? "",
      lastName: billingPrefill.secondName ?? "",
      country: billingPrefill.country ?? "",
      streetAddress: billingPrefill.streetAddress ?? "",
      city: billingPrefill.city ?? "",
      state: billingPrefill.state ?? "",
      zipCode: billingPrefill.zipCode ?? "",
      phone: billingPrefill.phone ?? "",
      email: billingPrefill.email ?? "",
      companyName: "",
      apartment: "",
      orderNotes: "",
    });
  }, [billingPrefill, reset]);

  const handleUnlockSlot = async () => {
    try {
      await unlockDoctorSlot({ doctorId, date, startTime });
    } catch {
      console.error("Failed to unlock slot");
    }
  };

  useConfirmNavigation(
    blockNavigation,
    "Your booking slot will be cancelled. Are you sure you want to leave?",
    handleUnlockSlot
  );

  const verifyPaymentMutation = useMutation({
    mutationFn: verifyDoctorPayment,
    onSuccess: () => {
      setBlockNavigation(false);
      setPaymentSuccess(true);
      notify.success(
        "Payment successfull and doctor apponiment is created successfully"
      );
    },
    onError: () => {
      notify.error("Payment verification failed");
    },
  });

  useEffect(() => {
    if (!paymentSuccess) return;

    navigate(`/patient/booking-success/${appointmentId}`);
  }, [paymentSuccess, navigate]);

  const checkoutMutation = useMutation({
    mutationFn: checkoutDoctorBooking,

    onSuccess: (data) => {
      console.log("the data is", data);
      setAppointmentId(data.appointmentId);
      openRazorpayCheckout({
        orderId: data.razorpayOrderId,
        amount: data.amount,
        currency: "INR",
        name: "Doctor Appointment",
        description: "Consultation Fee",

        prefill: {
          name: billingPrefill?.firstName,
          email: billingPrefill?.email,
          contact: billingPrefill?.phone,
        },

        onSuccess: (response) => {
          verifyPaymentMutation.mutate({
            appointmentId: data.appointmentId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          console.log(response);
        },

        onDismiss: () => {
          notify.error("you have the oppurtunity to redo the payment");
        },
      });
    },

    onError: (err: any) => {
      notify.error(err?.response?.data?.message || "Checkout failed");
    },
  });

  const onSubmit = (data: BillingFormValues) => {
    if (!paymentMethod) {
      notify.error("Please select payment method");
      return;
    }

    checkoutMutation.mutate({
      doctorId,
      date,
      startTime,
      billingDetails: data,
      paymentMethod: "online",
    });
  };

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-50 py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-500 text-sm">Home &gt; Checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Billing */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Billing details</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="First name"
                error={errors.firstName?.message}
                register={register("firstName")}
              />
              <InputField
                label="Last name"
                error={errors.lastName?.message}
                register={register("lastName")}
              />
            </div>

            <InputField
              label="Country / Region"
              error={errors.country?.message}
              register={register("country")}
            />

            <InputField
              label="Street address"
              error={errors.streetAddress?.message}
              register={register("streetAddress")}
            />

            <InputField
              label="Town / City"
              error={errors.city?.message}
              register={register("city")}
            />

            <InputField
              label="State"
              error={errors.state?.message}
              register={register("state")}
            />

            <InputField
              label="ZIP Code"
              error={errors.zipCode?.message}
              register={register("zipCode")}
            />

            <InputField
              label="Phone"
              error={errors.phone?.message}
              register={register("phone")}
            />

            <InputField
              label="Email address"
              type="email"
              error={errors.email?.message}
              register={register("email")}
            />
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Your order</h2>

            <div className="flex justify-between mb-4">
              <span>Doctor Booking</span>
              <span>${billingPrefill?.doctorPrice}</span>
            </div>

            <div className="font-bold border-t pt-4 flex justify-between">
              <span>Total</span>
              <span>${billingPrefill?.doctorPrice}</span>
            </div>

            <div className="mt-6">
              <label className="flex gap-2 items-start">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Razorpay Online
              </label>
            </div>

            <button
              type="submit"
              disabled={checkoutMutation.isPending}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {checkoutMutation.isPending ? "Processing..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DoctorBooking;
