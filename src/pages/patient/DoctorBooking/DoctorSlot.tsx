import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface TimeSlot {
  time: string;
  slots: number;
  available: boolean;
}

const DoctorSlots: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number>(5);
  const [selectedTime, setSelectedTime] = useState<string>("10:10 am");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 11, 1)); // December 2025
  const [clinicName, setClinicName] = useState<string>("");
  const [visitType, setVisitType] = useState<string>("");

  const timeSlots: TimeSlot[] = [
    { time: "9:00 am", slots: 1, available: true },
    { time: "9:35 am", slots: 1, available: true },
    { time: "10:10 am", slots: 1, available: true },
    { time: "10:45 am", slots: 1, available: true },
    { time: "11:20 am", slots: 1, available: true },
    { time: "11:55 am", slots: 1, available: true },
    { time: "2:00 pm", slots: 1, available: true },
    { time: "2:35 pm", slots: 1, available: true },
    { time: "3:10 pm", slots: 1, available: true },
    { time: "3:45 pm", slots: 1, available: true },
    { time: "4:20 pm", slots: 1, available: true },
    { time: "4:55 pm", slots: 1, available: true },
  ];

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days.map((day, index) => {
      if (day === null) {
        return (
          <div
            key={`empty-${index}`}
            className="h-10 flex items-center justify-center text-gray-300"
          >
            {index < firstDay &&
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                0
              ).getDate() -
                firstDay +
                index +
                1}
          </div>
        );
      }

      const isSelected = day === selectedDate;
      const isPast = day < 5;

      return (
        <button
          key={day}
          onClick={() => !isPast && setSelectedDate(day)}
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dr. Ruby Perrin
            </h1>
            <p className="text-gray-600">Dentist</p>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>Scottsdale, Arizona, United States, 20005</span>
            </div>
          </div>
        </div>

        {/* Booking Info */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Booking Info.
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clinic Name
            </label>
            <input
              type="text"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter clinic name"
            />
          </div>
        </div>

        {/* Calendar and Time Slots */}
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1
                    )
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
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
                      currentMonth.getMonth() + 1
                    )
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="h-10 flex items-center justify-center text-sm font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTime === slot.time
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-blue-600"
                  }`}
                >
                  <div>{slot.time}</div>
                  <div className="text-xs opacity-75">Slots: {slot.slots}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visit Type */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visit Type
          </label>
          <input
            type="text"
            value={visitType}
            onChange={(e) => setVisitType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tele"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Add Basic Information
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSlots;
