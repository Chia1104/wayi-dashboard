import dayjs from "dayjs";

export const getToday = () => {
  return dayjs().format("YYYY-MM-DD");
};

/** Get Time, format `12:00:00`  */
export const getShortTime = (date: Date) => {
  return Intl.DateTimeFormat("zh-tw", {
    timeStyle: "medium",
    hour12: false,
  }).format(date);
};

export const getShortDate = (date: string | number | Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};
/** 2-12-22, 21:31:42 */
export const getShortDateTime = (date: string | number | Date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
/** YYYY-MM-DD_HH:mm:ss  */
export const getMediumDateTime = (date: string | number | Date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

export const getTodayEarly = (today: string | number | Date) =>
  dayjs(today).set("hour", 0).set("minute", 0).set("millisecond", 0).toDate();
export const getTodayLate = (today: Date) =>
  dayjs(today)
    .set("hour", 23)
    .set("minute", 59)
    .set("millisecond", 999)
    .toDate();

export const getWeekStart = (today: string | number | Date) =>
  dayjs(today)
    .set("day", 0)
    .set("hour", 0)
    .set("millisecond", 0)
    .set("minute", 0)
    .toDate();
export const getWeekEnd = (today: string | number | Date) =>
  dayjs(today)
    .set("day", 6)
    .set("hour", 23)
    .set("millisecond", 999)
    .set("minute", 59)
    .toDate();

export const getMonthStart = (today: string | number | Date) =>
  dayjs(today)
    .set("date", 1)
    .set("hour", 0)
    .set("minute", 0)
    .set("millisecond", 0)
    .toDate();
export const getMonthEnd = (today: string | number | Date) =>
  dayjs(today)
    .set("date", dayjs(today).daysInMonth())
    .set("hour", 23)
    .set("minute", 59)
    .set("millisecond", 999)
    .toDate();

export function getMonthLength(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}
