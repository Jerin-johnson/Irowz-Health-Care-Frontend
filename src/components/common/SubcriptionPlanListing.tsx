import React from "react";

interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  durationInDays: number;
  doctorLimit: number;
  features: string[];
  isActive: boolean;
}

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  currentPlanId?: string;
  onSubscribe: (planId: string, amount: number) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  plans,
  currentPlanId,
  onSubscribe,
}) => {
  const formatPlanName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getPlanBadge = (name: string) => {
    if (name.toLowerCase() === "pro" || name.toLowerCase() === "promax") {
      return (
        <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded ml-2">
          POPULAR
        </span>
      );
    }
    return null;
  };

  const isCurrentPlan = (planId: string) => planId === currentPlanId;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Choose Your Subscription Plan
        </h1>
        <p className="text-gray-600 mt-1">
          Select the best plan for your hospital operations
        </p>
      </div>

      {/* Current Plan Display */}
      {currentPlanId && (
        <div className="bg-blue-600 text-white rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold">
                {formatPlanName(
                  plans.find((p) => p._id === currentPlanId)?.name || "",
                )}{" "}
                Plan
              </p>
              <p className="text-sm text-blue-100">Currently Active</p>
            </div>
          </div>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = isCurrentPlan(plan._id);
          const isTrial = plan.name.toLowerCase().includes("trial");
          const isPremium = plan.name.toLowerCase() === "promax";

          return (
            <div
              key={plan._id}
              className={`relative rounded-lg border-2 p-6 transition-all hover:shadow-lg ${
                isPremium
                  ? "border-blue-500 bg-blue-50"
                  : isCurrent
                    ? "border-blue-400 bg-white"
                    : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {/* Plan Header */}
              <div className="mb-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {formatPlanName(plan.name)}
                  </h3>
                  {getPlanBadge(plan.name)}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{plan.durationInDays} days
                  </span>
                </div>
              </div>

              {/* Limits */}
              <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Doctors</span>
                  <span className="font-semibold text-gray-900">
                    {plan.doctorLimit === 99999
                      ? "Unlimited"
                      : plan.doctorLimit}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onSubscribe(plan._id, plan.price)}
                disabled={isCurrent}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  isCurrent
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : isPremium
                      ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                      : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                {isCurrent
                  ? "Current Plan"
                  : isTrial
                    ? "Start Free Trial"
                    : "Subscribe Now"}
              </button>

              {isCurrent && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Active
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
