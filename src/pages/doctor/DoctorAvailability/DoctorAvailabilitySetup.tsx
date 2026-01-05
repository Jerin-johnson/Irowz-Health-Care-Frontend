import React, { useState } from "react";
import { Save, AlertCircle } from "lucide-react";

interface WorkingHours {
  day: string;
  start: string;
  end: string;
}

const DoctorAvailabilitySetup: React.FC = () => {
  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: false,
    friday: true,
    saturday: true,
    sunday: false,
  });

  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { day: "Monday", start: "09:00", end: "17:00" },
    { day: "Tuesday", start: "09:00", end: "17:00" },
    { day: "Wednesday", start: "09:00", end: "17:00" },
    { day: "Thursday", start: "09:00", end: "17:00" },
    { day: "Friday", start: "09:00", end: "17:00" },
  ]);

  const [lunchBreak, setLunchBreak] = useState({
    start: "12:00",
    end: "13:00",
  });

  const [cancellationDuration, setCancellationDuration] = useState("5");
  const [maxPatientsPerDay, setMaxPatientsPerDay] = useState("30");
  const [autoSlotEnabled, setAutoSlotEnabled] = useState(true);

  const toggleWorkingDay = (day: keyof typeof workingDays) => {
    setWorkingDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const updateWorkingHours = (
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    const newHours = [...workingHours];
    newHours[index][field] = value;
    setWorkingHours(newHours);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Weekly Availability Setup
          </h1>
          <p className="text-gray-500 text-sm">
            Configure your working schedule for automatic slot generation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Working Days */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Working Days
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "monday", label: "Monday" },
                  { key: "tuesday", label: "Tuesday" },
                  { key: "wednesday", label: "Wednesday" },
                  { key: "thursday", label: "Thursday" },
                  { key: "friday", label: "Friday" },
                  { key: "saturday", label: "Saturday" },
                  { key: "sunday", label: "Sunday" },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{label}</span>
                    <button
                      onClick={() =>
                        toggleWorkingDay(key as keyof typeof workingDays)
                      }
                      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                        workingDays[key as keyof typeof workingDays]
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          workingDays[key as keyof typeof workingDays]
                            ? "translate-x-6"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Working Hours
              </h2>
              <div className="space-y-3">
                {workingHours.map((hours, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-700 w-24">
                      {hours.day}
                    </span>
                    <input
                      type="time"
                      value={hours.start}
                      onChange={(e) =>
                        updateWorkingHours(index, "start", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm">to</span>
                    <input
                      type="time"
                      value={hours.end}
                      onChange={(e) =>
                        updateWorkingHours(index, "end", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Lunch/Break Time */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Lunch/Break Time
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Time you will be unavailable during the day
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Break Start
                  </label>
                  <input
                    type="time"
                    value={lunchBreak.start}
                    onChange={(e) =>
                      setLunchBreak((prev) => ({
                        ...prev,
                        start: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Break End
                  </label>
                  <input
                    type="time"
                    value={lunchBreak.end}
                    onChange={(e) =>
                      setLunchBreak((prev) => ({
                        ...prev,
                        end: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Cancellation Rules */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Cancellation Rules
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Minimum Cancellation Duration
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={cancellationDuration}
                      onChange={(e) => setCancellationDuration(e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Min</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Max Patients Per Day
                  </label>
                  <input
                    type="number"
                    value={maxPatientsPerDay}
                    onChange={(e) => setMaxPatientsPerDay(e.target.value)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Operational Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Operational Controls
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Slot/Consultation Enabled
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Allow online slot consultation
                  </div>
                </div>
                <button
                  onClick={() => setAutoSlotEnabled(!autoSlotEnabled)}
                  className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                    autoSlotEnabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      autoSlotEnabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Auto Slot Generation Preview
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total per day</span>
                  <span className="font-bold text-blue-600">35</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total weekly slots</span>
                  <span className="font-bold text-blue-600">160</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">HOS Slots Count</span>
                  <span className="font-bold text-blue-600">120</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Telemedicine Slots</span>
                  <span className="font-bold text-purple-600">40</span>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" />
                  Save & Generate Slots
                </button>
              </div>

              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Reset Changes
              </button>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-yellow-900">
                    Security & Compliance
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    All changes are securely logged for audit purposes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilitySetup;
