import {
  DAY_MAP,
  REVERSE_DAY_MAP,
  type DayKey,
  type WorkingHours,
} from "../types/doctor/doctor.availbility.types";

export function buildWeeklySchedule(
  workingDays: Record<DayKey, boolean>,
  workingHours: WorkingHours[]
) {
  return workingHours.map((item) => {
    const isWorking = workingDays[item.day];

    return {
      day: DAY_MAP[item.day],
      isWorking,
      ...(isWorking && {
        workingHours: {
          start: item.start,
          end: item.end,
        },
        breakTime: {
          start: item.breakStart,
          end: item.breakEnd,
        },
      }),
    };
  });
}

export function hydrateFromApi(apiData: any) {
  const days: Record<DayKey, boolean> = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  };

  const hours = apiData.weeklySchedule.map((item: any) => {
    const map = REVERSE_DAY_MAP[item.day];
    days[map.key] = item.isWorking;

    return {
      day: map.key,
      label: map.label,
      start: item.workingHours?.start ?? "09:00",
      end: item.workingHours?.end ?? "17:00",
      breakStart: item.breakTime?.start ?? "",
      breakEnd: item.breakTime?.end ?? "",
    };
  });

  return {
    workingDays: days,
    workingHours: hours,
    slotDurationMinutes: String(apiData.slotDurationMinutes),
    maxPatientsPerDay: String(apiData.maxPatientsPerDay),
    teleConsultationEnabled: apiData.teleConsultationEnabled,
  };
}
