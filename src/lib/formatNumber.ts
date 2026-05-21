export const formatNumber = (value?: number | string | null): string => {
  if (value === null || value === undefined || value === "") return "0";

  const num = Number(value);
  if (isNaN(num)) return "0";

  // check decimal part
  const hasDecimal = num % 1 !== 0;

  return num.toLocaleString("en-US", {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 2,
  });
};