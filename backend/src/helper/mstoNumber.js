export const mstonumber = (expireValue) => {
  if (!expireValue) return 7 * 24 * 60 * 60 * 1000;
  if (/^\d+$/.test(expireValue)) return Number(expireValue) * 1000;
  const unit = expireValue[expireValue.length - 1];
  const num = Number(expireValue.slice(0, -1));
  if (Number.isNaN(num)) return 7 * 24 * 60 * 60 * 1000;
  switch (unit) {
    case "d":
      return num * 24 * 60 * 60 * 1000;
    case "h":
      return num * 60 * 60 * 1000;
    case "m":
      return num * 60 * 1000;
    case "s":
      return num * 1000;
    default:
      return 7 * 24 * 60 * 60 * 1000;
  }
  console.log(expireValue)
};
