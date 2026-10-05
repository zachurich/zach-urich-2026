export const dateFromString = (stringDate: string) => {
  const date = new Date(stringDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    // Date-only strings (YYYY-MM-DD) parse as UTC midnight
    timeZone: "UTC",
  }).format(date);
};

/** Formats a date string as an ISO 8601 date (YYYY-MM-DD). */
export const isoDateFromString = (stringDate: string) => {
  const date = new Date(stringDate);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};
