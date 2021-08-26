export function toTimestamp(strDate: string) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}
