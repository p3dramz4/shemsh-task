import { GOLD_FEE_PERCENTAGE } from "@/constants/fee";

export const getTotalWithFee = (amount: number) =>
  Math.floor(amount * (1 + GOLD_FEE_PERCENTAGE / 100));

export const extractAmountWithoutFee = (amountWithFee: number) =>
  Math.floor(amountWithFee / (1 + GOLD_FEE_PERCENTAGE / 100));
