export const isPastSlot = (
  date: string,
  startTime: string,
  now: Date,
): boolean => {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = startTime.split(":").map(Number);

  // ✅ Construct LOCAL datetime safely
  const slotTime = new Date(
    year,
    month - 1, // JS months are 0-based
    day,
    hour,
    minute,
    0,
    0,
  );

  return slotTime.getTime() <= now.getTime();
};
