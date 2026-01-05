import React, { useState } from "react";

interface BillingDetails {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  orderNotes: string;
}

const DoctorBooking: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("transfer");

  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const handleInputChange = (field: keyof BillingDetails, value: string) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-500 text-sm">Home &gt; Checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Billing Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Billing details
              </h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={billingDetails.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      placeholder="First name"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={billingDetails.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder="Last name"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Company name (optional)
                  </label>
                  <input
                    type="text"
                    value={billingDetails.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    placeholder="Company name"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={billingDetails.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Street address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={billingDetails.streetAddress}
                    onChange={(e) =>
                      handleInputChange("streetAddress", e.target.value)
                    }
                    placeholder="Street address"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Apartment, suite, unit, etc. (optional)
                  </label>
                  <input
                    type="text"
                    value={billingDetails.apartment}
                    onChange={(e) =>
                      handleInputChange("apartment", e.target.value)
                    }
                    placeholder="Apartment, suite, unit, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Town / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={billingDetails.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Town / City"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={billingDetails.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={billingDetails.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    placeholder="ZIP Code"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={billingDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={billingDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Order notes (optional)
                  </label>
                  <textarea
                    value={billingDetails.orderNotes}
                    onChange={(e) =>
                      handleInputChange("orderNotes", e.target.value)
                    }
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Your order
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Product</span>
                  <span className="text-gray-700">Subtotal</span>
                </div>
                <div className="flex justify-between text-sm border-b pb-4">
                  <span className="text-gray-600">Doctor Booking × 1</span>
                  <span className="font-medium">$200.00</span>
                </div>
                <div className="flex justify-between text-sm border-b pb-4">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium">$200.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>$200.00</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Payment Methods
                </h3>
                <div className="space-y-2">
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === "transfer"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Direct bank transfer
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="check"
                      checked={paymentMethod === "check"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Check payments
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Cash on delivery
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        PayPal
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorBooking;
