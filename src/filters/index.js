// set function parseTime,formatTime to filter
export { parseTime, formatTime } from "@/utils";
import { utc2LocalDate } from "@/utils/day";
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + "s";
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour");
  } else {
    return pluralize(~~(between / 86400), " day");
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}
/**
 * @description 返回2010/10/10类型的时间
 * @export
 * @param {*} value
 * @returns
 */
export function utc2LocalYmd(value) {
  return value === null ? "---" : utc2LocalDate(value).substr(0, 10);
}
/**
 * @description 返回00:00:00类型的时间
 * @export
 * @param {*} value
 * @returns
 */
export function utc2LocalTime(value) {
  return value === null ? "---" : utc2LocalDate(value).substr(11);
}
