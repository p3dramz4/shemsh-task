"use client";

import { useGoldStore } from "../stores/useGoldStore";
import { GOLD_FEE_PERCENTAGE } from "@/constants/fee";

export const FeeInfo = () => {
  const { rialAmount } = useGoldStore();

  const feeAmount = Math.floor((rialAmount * GOLD_FEE_PERCENTAGE) / 100);

  return (
    <div className="text-sm text-gray-600 mt-4 flex justify-between mb-10 pb-5 border-b border-gray-200">
      <span
        dir="rtl"
        className="bg-gray-50 py-0.5 px-2 rounded-md text-sm font-bold text-zinc-800">
        {feeAmount.toLocaleString("fa-IR")}{" "}
        <span className="font-medium text-xs text-gray-500">ریال</span>
      </span>

      <span className="font-medium text-sm">:کارمزد خرید</span>
    </div>
  );
};
