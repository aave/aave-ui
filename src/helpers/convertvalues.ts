export const ConvertToLocaleString = (str: string, fix: number) => {
  const pre = Number(str).toFixed(fix);
  return Number(pre).toLocaleString();
};
