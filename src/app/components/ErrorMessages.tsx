"use client";
import { formatToPersian } from "../utils/helper";

export interface GoldFormErrors {
  rialError?: string;
  goldError?: string;
}

export function getGoldErrors({
  rialAmount,
  goldAmount,
  goldPrice,
}: {
  rialAmount: number;
  goldAmount: number;
  goldPrice: number;
}): GoldFormErrors {
  const errors: GoldFormErrors = {};

  if (rialAmount > 2000000000) {
    errors.rialError = "مبلغ پرداختی وارد شده بیشتر از سقف خرید روزانه است";
  } else if (goldAmount < 1 && rialAmount !== 0) {
    errors.rialError = `باید حداقل مبلغ طلا ${formatToPersian(
      goldPrice
    )} ریال باشد`;
  }

  if (goldAmount > 60000) {
    errors.goldError = "مقدار طلا وارد شده بیشتر از سقف خرید روزانه است";
  } 
  return errors;
}
