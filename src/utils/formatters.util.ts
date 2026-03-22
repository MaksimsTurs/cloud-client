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
