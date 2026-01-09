interface RazorpayOptions {
  orderId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onDismiss?: () => void;
}

export const openRazorpayCheckout = (options: RazorpayOptions) => {
  const razorpay = new (window as any).Razorpay({
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: options.amount,
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.orderId,

    handler: options.onSuccess,

    prefill: options.prefill,

    theme: {
      color: "#2563eb",
    },

    modal: {
      ondismiss: options.onDismiss,
    },
  });

  razorpay.open();
};
