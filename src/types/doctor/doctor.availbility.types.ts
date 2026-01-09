export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export const DAY_MAP: Record<
  DayKey,
  "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN"
> = {
  monday: "MON",
  tuesday: "TUE",
  wednesday: "WED",
  thursday: "THU",
  friday: "FRI",
  saturday: "SAT",
  sunday: "SUN",
};

export interface WorkingHours {
  day: DayKey;
  label: string;
  start: string;
  end: string;
  breakStart: string;
  breakEnd: string;
}

export const REVERSE_DAY_MAP: Record<
  "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN",
  { key: DayKey; label: string }
> = {
  MON: { key: "monday", label: "Monday" },
  TUE: { key: "tuesday", label: "Tuesday" },
  WED: { key: "wednesday", label: "Wednesday" },
  THU: { key: "thursday", label: "Thursday" },
  FRI: { key: "friday", label: "Friday" },
  SAT: { key: "saturday", label: "Saturday" },
  SUN: { key: "sunday", label: "Sunday" },
};
