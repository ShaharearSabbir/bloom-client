import { isBefore, isAfter, subMinutes, parseISO } from "date-fns";

export const isJoinable = (
  bookingDate: string,
  startTime: string,
  endTime: string,
) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const sessionStart = new Date(bookingDate);
  sessionStart.setHours(hours, minutes, 0, 0);

  const [endHours, endMinutes] = endTime.split(":").map(Number);
  const sessionEnd = new Date(bookingDate);
  sessionEnd.setHours(endHours, endMinutes, 0, 0);

  const now = new Date();
  const windowStart = subMinutes(sessionStart, 10);

  return isAfter(now, windowStart) && isBefore(now, sessionEnd);
};
