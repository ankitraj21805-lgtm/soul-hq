export type AttendanceStatus = "IN" | "LATE" | "OUT" | "NO_REPLY";

export function attendancePoints(status: AttendanceStatus, played = false) {
  if (status === "IN") return played ? 10 : 8;
  if (status === "LATE") return 7;
  if (status === "OUT") return 5;
  return 0;
}

export function warningAction(count: number) {
  if (count <= 1) return "Reminder";
  if (count === 2) return "Role Hold";
  return "Remove Review";
}
