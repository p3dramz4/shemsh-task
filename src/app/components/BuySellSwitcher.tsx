"use client";

import { useState } from "react";

export const BuySellSwitcher = () => {
  const [mode, setMode] = useState<"buy" | "sell">("buy");

  return (
    <div className="w-full h-[42px] bg-switcher2 rounded-sm flex items-center px-[5px] mb-6">
      <button
        onClick={() => setMode("sell")}
        className={`w-full px-4 py-2 rounded-sm cursor-pointer h-8 font-medium flex justify-center items-center text-[12px] ${
          mode === "sell"
            ? "bg-switcher text-white"
            : "bg-switcher2 text-customText"
        }`}>
        فروش طلا
      </button>
      <button
        onClick={() => setMode("buy")}
        className={`w-full px-4 py-2 rounded-sm cursor-pointer h-8 font-medium flex justify-center items-center text-[12px] ${
          mode === "buy"
            ? "bg-switcher text-white"
            : "bg-switcher2 text-gray-600"
        }`}>
        خرید طلا
      </button>
    </div>
  );
};
