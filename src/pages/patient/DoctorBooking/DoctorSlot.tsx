import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDoctorProfile } from "../../../api/apiService/patient/doctorListing";
import { mapDoctorProfileToDoctor } from "../../../mapper/doctor.profile.mapper";
import {
  fetchDoctorAvailbleSlots,
  lockDoctorSlots,
} from "../../../api/apiService/patient/doctorSlots";
import { notify } from "../../../shared/notification/toast";
import DoctorSlotsSkeleton from "../../../components/patient/DoctorListing/DoctorSlotSleckton";
import { useRescheduleAppointment } from "../../../hooks/patient/appointments/useRescheduleAppointment";

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DoctorSlots: React.FC = () => {
  const navigate = useNavigate();
  const { id: doctorId } = useParams();
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const location = useLocation();

  // reschdeuling
  const isReschedule = location.state?.isReschedule === true;
  const appointmentId = location.state?.appointmentId;

  const rescheduleMutation = useRescheduleAppointment();

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["doctor:profile", doctorId],
    queryFn: async () => {
      const raw = await fetchDoctorProfile(doctorId!);
      return mapDoctorProfileToDoctor(raw);
    },
    enabled: !!doctorId,
  });

  const selectedDateISO = formatLocalDate(selectedDate);

  const { data: timeSlots, isLoading: isSlotLoading } = useQuery({
    queryKey: ["doctor:slots", doctorId, selectedDateISO],
    queryFn: () =>
      fetchDoctorAvailbleSlots(doctorId as string, selectedDateISO),
    enabled: !!doctorId,
    staleTime: 0,
  });

  const lockDoctorSlotQuery = useMutation({
    mutationFn: ({
      doctorId,
      date,
      startTime,
    }: {
      doctorId: string;
      date: string;
      startTime: string;
    }) => lockDoctorSlots(doctorId, date, startTime),

    // onSuccess: (data, variables) => {
    //   console.log("this is for testing puport", data, variables);
    //   if (data.success) {
    //     notify.success(data.message);

    //     // navigate("/patient/doctor/booking", {
    //     //   state: {
    //     //     doctorId: variables.doctorId,
    //     //     date: variables.date,
    //     //     startTime: variables.startTime,
    //     //   },
    //     // });

    //     queryClient.invalidateQueries({
    //       queryKey: ["doctor:slots", variables.doctorId, variables.date],
    //     });
    //   } else {
    //     notify.error(data.message || "Something went wrong");
    //   }
    // },

    // onError: (error: any) => {
    //   console.log(error);
    //   notify.error(error?.response?.data?.message || "Booking failed");
    // },
  });

  if (isLoading || isSlotLoading) {
    return <DoctorSlotsSkeleton />;
  }
  if (!doctor || !timeSlots) {
    notify.error(
      "Doctor identified has fraud...our systmen will remove this doctor soon...sorry for the inconvience",
    );
    navigate(-1);
    return;
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return days.map((day, index) => {
      if (day === null) {
        return (
          <div
            key={`empty-${index}`}
            className="h-10 flex items-center justify-center text-gray-300"
          />
        );
      }

      const dateObj = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
      );

      const isPast = dateObj < today;
      const isSelected = selectedDate.toDateString() === dateObj.toDateString();

      return (
        <button
          key={day}
          onClick={() => !isPast && setSelectedDate(dateObj)}
          disabled={isPast}
          className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            isSelected
              ? "bg-blue-600 text-white"
              : isPast
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    });
  };

  const handleConfirmBooking = async () => {
    if (!selectedTime) {
      notify.error("Please select a time slot");
      return;
    }

    const lockResult = await lockDoctorSlotQuery.mutateAsync({
      doctorId: doctorId as string,
      date: selectedDateISO,
      startTime: selectedTime,
    });

    if (!lockResult.success) {
      notify.error(lockResult.message || "Slot locking failed");
      return;
    }

    if (isReschedule) {
      if (!appointmentId) {
        notify.error("Invalid reschedule request");
        return;
      }

      await rescheduleMutation.mutateAsync({
        appointmentId,
        doctorId: doctorId as string,
        date: selectedDateISO,
        startTime: selectedTime,
        endTime: "",
      });

      queryClient.invalidateQueries({
        queryKey: ["patient:appointments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["doctor:slots", doctorId, selectedDateISO],
      });

      navigate("/patient/appointments");
      return;
    }

    //normal booking flow

    notify.success("slot locked successsfully");

    queryClient.invalidateQueries({
      queryKey: ["doctor:slots", doctorId, selectedDateISO],
    });

    navigate("/patient/doctor/booking", {
      state: {
        doctorId: doctorId,
        date: selectedDateISO,
        startTime: selectedTime,
      },
    });
  };

  const isSubmitting =
    lockDoctorSlotQuery.isPending || rescheduleMutation.isPending;

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
            <p className="text-gray-600">{doctor.specialty}</p>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>{doctor.address}</span>
            </div>
          </div>
        </div>

        {/* Calendar + Slots */}
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1,
                    ),
                  )
                }
              >
                <ChevronLeft />
              </button>

              <h3 className="text-lg font-semibold">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>

              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                    ),
                  )
                }
              >
                <ChevronRight />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div
                  key={d}
                  className="h-10 flex items-center justify-center text-sm text-gray-500"
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>

          {/* Slots */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>

            <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
              {isSlotLoading ? (
                Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 rounded-lg bg-gray-200 animate-pulse"
                  />
                ))
              ) : timeSlots.length === 0 ? (
                <div className="col-span-3 text-center text-gray-500">
                  No slots available
                </div>
              ) : (
                timeSlots.map((slot) => (
                  <button
                    key={slot.startTime}
                    disabled={lockDoctorSlotQuery.isPending}
                    onClick={() => setSelectedTime(slot.startTime)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      selectedTime === slot.startTime
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 hover:border-blue-600"
                    }`}
                  >
                    <div>{slot.startTime}</div>
                    <div className="text-xs opacity-75">
                      Slots: {slot.slots}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleConfirmBooking}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {isReschedule ? "Confirm Reschedule" : "Confirm Booking"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSlots;
