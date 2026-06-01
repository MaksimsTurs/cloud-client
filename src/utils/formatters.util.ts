import type { FormattedTime } from "./formatters.type";

export function formatToMemoryUnit(bytes: number): string {
  const units: string[] = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];
  const i: number = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length);
  const value: number = bytes / Math.pow(1024, i);

  const formatter = new Intl.NumberFormat(undefined, {
    style: "unit",
    unit: units[i],
    unitDisplay: "narrow",
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};

export function formatSecondsToTime(seconds: number): FormattedTime {
  const time: FormattedTime = {
    h: 0,
    m: 0,
    s: 0
  };
  
  if(seconds != 0) {
    time.h = ~~((seconds / 60) / 60)
    time.m = ~~(((seconds / 60) % 60))
    time.s = ~~(seconds % 60)
  }

  return time;
};

export function formatLeadingZeroCount(num: number, count: number): string {
  return num.toString().padStart(count, "0");
};
