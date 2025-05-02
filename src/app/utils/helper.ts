export const formatToPersian = (value: number | string): string => {
  const num = Number(value);
  if (isNaN(num)) return "";

  const formatted = new Intl.NumberFormat("en-US").format(num); 
  return formatted.replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]); 
};

export const persianToEnglishDigits = (str: string): string => {
  return str.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
};

export const removeCommas = (str: string): string => str.replace(/,/g, "");
