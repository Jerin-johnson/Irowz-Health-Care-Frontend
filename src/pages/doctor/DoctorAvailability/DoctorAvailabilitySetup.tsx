import React, { useEffect, useState } from "react";
import { Save, AlertCircle } from "lucide-react";
import { useAppSelector } from "../../../store/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkEditDoctorAvailbilityConfigApi,
  confirmEditDoctorAvailbilityConfigApi,
  getDoctorAvailbilityConfigApi,
  postDoctorAvailbilityConfigApi,
} from "../../../api/apiService/doctor/doctor.availibility.config";
import {
  type DayKey,
  type WorkingHours,
} from "../../../types/doctor/doctor.availbility.types";
import { notify } from "../../../shared/notification/toast";
import {
  buildWeeklySchedule,
  hydrateFromApi,
} from "../../../mapper/doctorAvailability.mapper";
import { confirmAction } from "../../../shared/notification/confirm";

const DoctorAvailabilitySetup: React.FC = () => {
  const [workingDays, setWorkingDays] = useState<Record<DayKey, boolean>>({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: false,
    friday: true,
    saturday: true,
    sunday: false,
  });

  const queryClient = useQueryClient();
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    {
      day: "monday",
      label: "Monday",
      start: "09:00",
      end: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "tuesday",
      label: "Tuesday",
      start: "09:00",
      end: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "wednesday",
      label: "Wednesday",
      start: "09:00",
      end: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "thursday",
      label: "Thursday",
      start: "09:00",
      end: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "friday",
      label: "Friday",
      start: "09:00",
      end: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "saturday",
      label: "Saturday",
      start: "09:00",
      end: "14:00",
      breakStart: "11:30",
      breakEnd: "12:00",
    },
    {
      day: "sunday",
      label: "Sunday",
      start: "09:00",
      end: "14:00",
      breakStart: "11:30",
      breakEnd: "12:00",
    },
  ]);

  const [isEditMode, setIsEditMode] = useState(false);

  const doctorId = useAppSelector((state) => state.auth.doctorId);

  const [slotDurationMinutes, setSlotDurationMinutes] = useState("15");
  const [maxPatientsPerDay, setMaxPatientsPerDay] = useState("30");
  const [teleConsultationEnabled, setTeleConsultationEnabled] = useState(true);

  const toggleWorkingDay = (day: DayKey) => {
    setWorkingDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const updateWorkingHours = (
    index: number,
    field: "start" | "end" | "breakStart" | "breakEnd",
    value: string,
  ) => {
    const updated = [...workingHours];
    updated[index][field] = value;
    setWorkingHours(updated);
  };
  console.log(doctorId, !!doctorId);
  const { data } = useQuery({
    queryKey: ["doctor:availbilty", doctorId],
    queryFn: getDoctorAvailbilityConfigApi,
    enabled: !!doctorId,
  });

  useEffect(() => {
    if (!data) return;

    const hydrated = hydrateFromApi(data);

    setWorkingDays(hydrated.workingDays);
    setWorkingHours(hydrated.workingHours);
    setSlotDurationMinutes(hydrated.slotDurationMinutes);
    setMaxPatientsPerDay(hydrated.maxPatientsPerDay);
    setTeleConsultationEnabled(hydrated.teleConsultationEnabled);

    setIsEditMode(true);
  }, [data]);

  const postDoctorMutateFn = useMutation({
    mutationFn: postDoctorAvailbilityConfigApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor:availbilty", doctorId as string],
      });
      notify.success("availablity updated successfully");
    },
    onError: () => {
      notify.error("something went wrong...please try again later");
    },
  });

  const checkAvlaibiltyConfiltDoctorMutateFn = useMutation({
    mutationFn: checkEditDoctorAvailbilityConfigApi,
  });

  const confirmAvlaibiltyConfiltDoctorMutateFn = useMutation({
    mutationFn: confirmEditDoctorAvailbilityConfigApi,
  });

  const handleEditSaveGenerate = async () => {
    const payload = {
      weeklySchedule: buildWeeklySchedule(workingDays, workingHours),
      slotDurationMinutes: Number(slotDurationMinutes),
      maxPatientsPerDay: Number(maxPatientsPerDay),
      teleConsultationEnabled,
    };

    console.log("Edit payload", payload);

    try {
      const canEditData =
        await checkAvlaibiltyConfiltDoctorMutateFn.mutateAsync(payload);

      if (!canEditData.canProceed) {
        const confirmResult = await confirmAction({
          title: "Conflicting appointments found",
          description: `This change affects ${canEditData.affectedAppointmentCount} appointments.
Patients will be notified and can reschedule or receive a full refund.
Do you want to continue?`,
          type: "warning",
        });

        if (!confirmResult) return;
      }

      await confirmAvlaibiltyConfiltDoctorMutateFn.mutateAsync(payload);

      //  IMPORTANT
      queryClient.invalidateQueries({
        queryKey: ["doctor:availbilty", doctorId],
      });

      notify.success("Availability updated successfully");
    } catch (error) {
      notify.error("Failed to update availability. Please try again.");
    }
  };

  const handleSaveAndGenerate = () => {
    const payload = {
      weeklySchedule: buildWeeklySchedule(workingDays, workingHours),
      slotDurationMinutes: Number(slotDurationMinutes),
      maxPatientsPerDay: Number(maxPatientsPerDay),
      teleConsultationEnabled,
    };

    postDoctorMutateFn.mutate(payload);

    console.log("FINAL PAYLOAD 👉", payload);
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
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Working Days */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Working Days
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {workingHours.map(({ day, label }) => (
                  <div
                    key={day}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{label}</span>
                    <button
                      onClick={() => toggleWorkingDay(day)}
                      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                        workingDays[day] ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          workingDays[day] ? "translate-x-6" : "translate-x-0.5"
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
                  <div key={hours.day} className="flex items-center gap-3">
                    <span className="text-sm text-gray-700 w-24">
                      {hours.label}
                    </span>
                    <input
                      type="time"
                      value={hours.start}
                      disabled={!workingDays[hours.day]}
                      onChange={(e) =>
                        updateWorkingHours(index, "start", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-gray-500 text-sm">to</span>
                    <input
                      type="time"
                      value={hours.end}
                      disabled={!workingDays[hours.day]}
                      onChange={(e) =>
                        updateWorkingHours(index, "end", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Lunch / Break Time */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Lunch / Break Time
              </h2>
              <div className="space-y-3">
                {workingHours.map((hours, index) => (
                  <div key={hours.day} className="flex items-center gap-3">
                    <span className="text-sm text-gray-700 w-24">
                      {hours.label}
                    </span>
                    <input
                      type="time"
                      value={hours.breakStart}
                      disabled={!workingDays[hours.day]}
                      onChange={(e) =>
                        updateWorkingHours(index, "breakStart", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-gray-500 text-sm">to</span>
                    <input
                      type="time"
                      disabled={!workingDays[hours.day]}
                      value={hours.breakEnd}
                      onChange={(e) =>
                        updateWorkingHours(index, "breakEnd", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Cancellation Rules */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Avg Consulation Time
              </h2>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={slotDurationMinutes}
                  onChange={(e) => setSlotDurationMinutes(e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <span className="text-sm text-gray-700">Min</span>
              </div>
            </div>

            {/* Max Patients */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Max Patients Per Day
              </h2>
              <input
                type="number"
                value={maxPatientsPerDay}
                onChange={(e) => setMaxPatientsPerDay(e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>

            {/* Tele Consultation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Operational Controls
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Slot / Consultation Enabled
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Allow online slot consultation
                  </div>
                </div>
                <button
                  onClick={() =>
                    setTeleConsultationEnabled(!teleConsultationEnabled)
                  }
                  className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                    teleConsultationEnabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      teleConsultationEnabled
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <button
                onClick={
                  isEditMode ? handleEditSaveGenerate : handleSaveAndGenerate
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                {isEditMode
                  ? "Edit & ReGenerate Slots"
                  : "Save & Generate Slots"}
              </button>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-xs text-yellow-700">
                  All changes are securely logged for audit purposes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilitySetup;
