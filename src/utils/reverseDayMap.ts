const dayMap: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const reverseDayMap: Record<string, number> = Object.fromEntries(
  Object.entries(dayMap).map(([k, v]) => [v, Number(k)]),
);

export { dayMap, reverseDayMap };