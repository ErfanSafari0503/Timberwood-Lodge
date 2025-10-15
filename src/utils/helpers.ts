import { formatDistance, parseISO, differenceInDays } from "date-fns";

/**
 * Subtract two dates and return the difference in days.
 * Works with Date objects or ISO date strings (from Supabase).
 */
export const subtractDates = (
  date1: string | Date,
  date2: string | Date
): number => {
  const parsedDate1 = typeof date1 === "string" ? parseISO(date1) : date1;
  const parsedDate2 = typeof date2 === "string" ? parseISO(date2) : date2;
  return differenceInDays(parsedDate1, parsedDate2);
};

/**
 * Format a date string relative to now, e.g. "3 days ago" or "In 5 days".
 */
export const formatDistanceFromNow = (date: string | Date): string => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return formatDistance(parsedDate, new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
};

/**
 * Get today's date in ISO format, optionally setting to start or end of day.
 */
interface GetTodayOptions {
  end?: boolean;
}

export const getToday = (options: GetTodayOptions = {}): string => {
  const today = new Date();

  if (options.end) {
    today.setUTCHours(23, 59, 59, 999); // last millisecond of the day
  } else {
    today.setUTCHours(0, 0, 0, 0); // start of the day
  }

  return today.toISOString();
};

/**
 * Format a number as USD currency string.
 */
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
