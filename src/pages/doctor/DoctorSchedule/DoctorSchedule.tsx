import React, { useEffect, useState } from "react";
import type { Slot, Stats } from "../../../types/doctor/doctor.schudele.types";
import ScheduleStats from "../../../components/doctor/schdule/SchudeleStatsDoctor";
import StatusBadge from "../../../components/doctor/schdule/StatusBadgeDoctor";
import SlotCard from "../../../components/doctor/schdule/DoctorSchudele.cards";

const DoctorSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"today" | "tomorrow" | "custom">(
    "today",
  );
  const [customDate, setCustomDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const selectedDate =
    activeTab === "today"
      ? todayStr
      : activeTab === "tomorrow"
        ? tomorrowStr
        : customDate;

  const fetchSlots = async () => {
    if (!selectedDate) return;

    setLoading(true);
    const res = await fetch(`/slots?date=${selectedDate}`, {
      credentials: "include",
    });
    const data = await res.json();

    const mapped: Slot[] = data.map((s: any, idx: number) => ({
      id: `${selectedDate}-${s.startTime}-${idx}`,
      ...s,
      date: selectedDate,
    }));

    setSlots(mapped);
    setLoading(false);
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  /* =======================
     BLOCK / UNBLOCK
  ======================= */

  const blockSlot = async (slot: Slot) => {
    await fetch(`/slots/block`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        startTime: slot.startTime,
        reason: "Doctor blocked",
      }),
    });
    fetchSlots();
  };

  const unblockSlot = async (slot: Slot) => {
    await fetch(`/slots/unblock`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        startTime: slot.startTime,
      }),
    });
    fetchSlots();
  };

  const stats: Stats = {
    total: slots.length,
    booked: slots.filter((s) => s.status === "booked").length,
    available: slots.filter((s) => s.status === "available").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Daily Schedule & Slot Preview
          </h1>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("today")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "today"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setActiveTab("tomorrow")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "tomorrow"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Tomorrow
                </button>
                <button
                  onClick={() => setActiveTab("custom")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "custom"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Custom
                </button>
              </div>

              {activeTab === "custom" && (
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm"
                />
              )}
            </div>

            <ScheduleStats stats={stats} />
          </div>

          <div className="flex gap-4 mb-6">
            <StatusBadge status="available" label="Available" />
            <StatusBadge status="booked" label="Booked" />
            <StatusBadge status="blocked" label="Blocked" />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading slots...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {slots.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                onBlock={() => blockSlot(slot)}
                onUnblock={() => unblockSlot(slot)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedule;
