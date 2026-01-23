import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, Info, Activity } from "lucide-react";

interface VitalsData {
  height: string;
  weight: string;
  bmi: string;
  bloodPressure: string;
  heartRate: string;
  bodyTemperature: string;
  oxygenSaturation: string;
  recordedAt: string;
  recordedBy: string;
}

const PatientVitals: React.FC = () => {
  const [vitals, setVitals] = useState<VitalsData>({
    height: "",
    weight: "",
    bmi: "Auto-calculated",
    bloodPressure: "",
    heartRate: "",
    bodyTemperature: "",
    oxygenSaturation: "",
    recordedAt: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    recordedBy: "Dr. Michael Chen",
  });

  // Auto-calculate BMI
  useEffect(() => {
    const height = parseFloat(vitals.height);
    const weight = parseFloat(vitals.weight);

    if (height && weight && height > 0) {
      const heightInMeters = height / 100;
      const calculatedBmi = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(1);
      setVitals((prev) => ({ ...prev, bmi: calculatedBmi }));
    } else {
      setVitals((prev) => ({ ...prev, bmi: "Auto-calculated" }));
    }
  }, [vitals.height, vitals.weight]);

  const handleInputChange = (field: keyof VitalsData, value: string) => {
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving vitals:", vitals);
    // Add save logic here
  };

  const handleBack = () => {
    console.log("Going back");
    // Add navigation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Patient Vitals
          </h1>
          <p className="text-sm text-gray-600">
            Record vital signs for the current consultation
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Record Vital Signs
              </h2>
              <p className="text-sm text-gray-500">
                Enter accurate measurements
              </p>
            </div>
          </div>

          {/* Basic Measurements */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
              <h3 className="text-sm font-semibold text-gray-900">
                Basic Measurements
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Height */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </label>
                <input
                  type="number"
                  value={vitals.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  placeholder="165"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </label>
                <input
                  type="number"
                  value={vitals.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="65"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* BMI */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                  BMI
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </label>
                <input
                  type="text"
                  value={vitals.bmi}
                  readOnly
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <h3 className="text-sm font-semibold text-gray-900">
                Vital Signs
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Pressure */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </label>
                <input
                  type="text"
                  value={vitals.bloodPressure}
                  onChange={(e) =>
                    handleInputChange("bloodPressure", e.target.value)
                  }
                  placeholder="120/80"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Heart Rate */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                  Heart Rate (bpm)
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </label>
                <input
                  type="number"
                  value={vitals.heartRate}
                  onChange={(e) =>
                    handleInputChange("heartRate", e.target.value)
                  }
                  placeholder="72"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Body Temperature */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                  Body Temperature (°C)
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={vitals.bodyTemperature}
                  onChange={(e) =>
                    handleInputChange("bodyTemperature", e.target.value)
                  }
                  placeholder="36.5"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Oxygen Saturation */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                  Oxygen Saturation (%)
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </label>
                <input
                  type="number"
                  value={vitals.oxygenSaturation}
                  onChange={(e) =>
                    handleInputChange("oxygenSaturation", e.target.value)
                  }
                  placeholder="98"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Recording Information */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <h3 className="text-sm font-semibold text-gray-900">
                Recording Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recorded At */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Recorded At
                </label>
                <input
                  type="text"
                  value={vitals.recordedAt}
                  readOnly
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Recorded By */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Recorded By
                </label>
                <input
                  type="text"
                  value={vitals.recordedBy}
                  readOnly
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              Save & Continue Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientVitals;
