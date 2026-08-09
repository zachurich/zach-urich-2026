export const dateFromString = (stringDate: string) => {
  const date = new Date(stringDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
