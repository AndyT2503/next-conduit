interface DateTimeOption {
  weekday: "narrow" | "short" | "long";
  era: "narrow" | "short" | "long";
  year: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day: "numeric" | "2-digit";
  hour: "numeric" | "2-digit";
  minute: "numeric" | "2-digit";
  second: "numeric" | "2-digit";
  timeZoneName: "short" | "long";
  timeZone: string;
  hour12: boolean;
  hourCycle: "h11" | "h12" | "h23" | "h24";
  formatMatcher: "basic" | "best fit";
}
export function formatDateTime(
  dateTime: string | Date | number,
  formatOption?: Partial<DateTimeOption>,
  locales?: string,
): string {
  const formattedDate = typeof dateTime === "string" || typeof dateTime === "number" ? new Date(dateTime) : dateTime;
  return new Intl.DateTimeFormat(locales, formatOption).format(formattedDate);
}
