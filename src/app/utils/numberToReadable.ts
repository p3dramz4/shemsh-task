export const numberToReadableToman = (input: number | string): string => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const convertToPersian = (num: number | string) =>
    num.toString().replace(/\d/g, d => persianNumbers[+d]);

  const number = typeof input === "string" ? parseInt(input) : input;
  const toman = Math.floor(number / 10);

  const parts = [];
  const million = Math.floor(toman / 1_000_000);
  const thousand = Math.floor((toman % 1_000_000) / 1_000);
  const rest = toman % 1_000;

  if (million > 0) parts.push(`${convertToPersian(million)} میلیون`);
  if (thousand > 0) parts.push(`${convertToPersian(thousand)} هزار`);
  if (rest > 0) parts.push(convertToPersian(rest));

  return parts.join(" و ");
};

export const numberToReadableGram = (input: number | string): string => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const convertToPersian = (num: number | string) =>
    num.toString().replace(/\d/g, d => persianNumbers[+d]);

  const number = typeof input === "string" ? parseFloat(input) : input;

  const gram = number / 1000;

  const isRounded = gram % 1 === 0;

  const formattedGram = isRounded ? Math.floor(gram) : gram.toFixed(3);

  return convertToPersian(formattedGram);
};



