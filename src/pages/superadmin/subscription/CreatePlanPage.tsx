import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createPlan } from "../../../api/apiService/superAdmin/subcription";
import { notify } from "../../../shared/notification/toast";

interface PlanFormData {
  name: string;
  price: string;
  durationInDays: string;
  doctorLimit: string;
  features: string[];
  isActive: boolean;
}

const CreatePlanPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PlanFormData>({
    name: "",
    price: "",
    durationInDays: "",
    doctorLimit: "",
    features: [],
    isActive: true,
  });

  const [featureInput, setFeatureInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && featureInput.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const createMutationApi = useMutation({
    mutationFn: createPlan,
    onError: (error: any) => {
      notify.error(
        error.response.data.message || error.message || "something went wrong",
      );
    },
    onSuccess: () => {
      notify.success("plan created successfully");
      return navigate(-1);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.doctorLimit) {
      notify.error("Please fill required fields");
      return;
    }

    const payload = {
      ...formData,
      isActive: formData.isActive,
      price: Number(formData.price),
      durationInDays: Number(formData.durationInDays),
      doctorLimit: Number(formData.doctorLimit),
    };

    console.log("Form submitted:", formData);
    createMutationApi.mutate(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Subscription Plan
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Define limits, pricing, and features for this plan
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl"
            onClick={() => navigate(-1)}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <InputField
            label="Plan Name"
            name="name"
            placeholder="Enter plan name (e.g. Basic, Pro)"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price amount"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <InputField
              label="Duration (Days)"
              name="durationInDays"
              type="number"
              placeholder="e.g. 30, 90, 365"
              value={formData.durationInDays}
              onChange={handleChange}
              required
            />
          </div>

          <InputField
            label="Max Doctors Allowed"
            name="doctorLimit"
            type="number"
            placeholder="e.g. 5, 20, 100"
            value={formData.doctorLimit}
            onChange={handleChange}
            required
          />

          {/* Features */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Features
            </label>
            <div className="border border-gray-300 rounded-lg p-3 min-h-[100px]">
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Enter features and press enter"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={handleFeatureKeyDown}
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Status Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plan Status
                </label>
                <p className="text-sm text-gray-600">
                  Enable or disable this subscription plan
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: prev.isActive ? false : true,
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.isActive ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={createMutationApi.isPending}
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanPage;

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  error,
}) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-lg border transition outline-none
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }
          focus:ring-2 focus:border-transparent
          disabled:bg-gray-100`}
      />

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};
