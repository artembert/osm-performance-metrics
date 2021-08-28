export const dateTimeSafe = (date: Date) =>
  new Intl.DateTimeFormat("se-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })
    .format(date)
    .replace(/:/g, "-");
