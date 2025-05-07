"use client";

import { useGoldStore } from "@/app/stores/useGoldStore";
import { getGoldErrors } from "./ErrorMessages";
import { useEffect, useState } from "react";
import {
  formatToPersian,
  persianToEnglishDigits,
  removeCommas,
} from "@/app/utils/helper";
import {
  numberToReadableToman,
  numberToReadableGram,
} from "../utils/numberToReadable";
import { getTotalWithFee, extractAmountWithoutFee } from "../utils/fee";

export default function GoldInputs() {
  const { rialAmount, goldAmount, goldPrice, updateRial, updateGold } =
    useGoldStore();

  const [rialInput, setRialInput] = useState("");
  const [goldInput, setGoldInput] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const rialNumeric = Number(removeCommas(persianToEnglishDigits(rialInput)));

  const { rialError, goldError } = getGoldErrors({
    rialAmount,
    goldAmount,
    goldPrice,
  });

  const handleRialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
     const cleaned = persianToEnglishDigits(raw).replace(/[^0-9]/g, "");
    const parsed = parseInt(cleaned.replace(/,/g, ""), 10);

    if (!/^[\d۰-۹]*$/.test(raw)) return;

    if (!isNaN(parsed)) {
      setRialInput(formatToPersian(parsed));

      if (debounceTimeout) clearTimeout(debounceTimeout);

      const timeout = setTimeout(() => {
        const rialWithoutFee = extractAmountWithoutFee(parsed);

        if (goldPrice > 0) {
          const gold = Math.floor(rialWithoutFee / goldPrice);
          updateRial(rialWithoutFee);
          updateGold(gold);
        }
      }, 1000);

      setDebounceTimeout(timeout);
    } else {
      setRialInput(raw);
    }
  };

  const handleGoldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
     const cleaned = persianToEnglishDigits(raw).replace(/[^0-9]/g, "");
    const parsedGold = parseFloat(cleaned.replace(/,/g, ""));

    if (!/^[\d۰-۹]*$/.test(raw)) return;

    if (!isNaN(parsedGold)) {
      updateGold(parsedGold);
      const calculatedRial = Math.floor(parsedGold * goldPrice);
      setRialInput(formatToPersian(calculatedRial));
      setGoldInput(formatToPersian(parsedGold));
    } else {
      setGoldInput(raw);
       updateGold(0);
       updateRial(0);
    }
  };

  useEffect(() => {
    setRialInput(rialAmount > 0 ? formatToPersian(rialAmount) : "");
  }, [rialAmount]);

  useEffect(() => {
    setGoldInput(goldAmount > 0 ? formatToPersian(goldAmount) : "");
  }, [goldAmount]);

 useEffect(() => {
   if (goldAmount > 0 && goldPrice > 0) {
     const rawRial = Math.floor(goldAmount * goldPrice);
     const withFee = getTotalWithFee(rawRial);
     setRialInput(formatToPersian(withFee));
     updateRial(rawRial); 
   }
 }, [goldPrice, goldAmount]);


  return (
    <>
      <div className="relative">
        <label className="block mb-2 text-[12px] text-customText2 text-right">
          مبلغ پرداختی با احتساب کارمزد
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            maxLength={14}
            inputMode="numeric"
            onChange={handleRialChange}
            value={rialInput}
            className="font-serif w-full h-[42px] text-[14px] font-bold border text-zinc-700 border-gray-300 rounded-lg p-3 text-right focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:text-zinc-800"
            name="amount"
            data-gtm-form-interact-field-id="2"
            placeholder="۰"
          />
          <span className="absolute left-3 text-gray-500 text-[10px] font-medium w-[18px] h-[18px]">
            ریال
          </span>
        </div>

        {rialInput && !rialError && (
          <p className="mt-[8px] text-right text-[11px] font-medium text-readable font-serif">
            معادل {numberToReadableToman(rialNumeric)} تومان
          </p>
        )}
        {rialError && (
          <div className="text-right mt-[8px] text-[11px] font-medium text-err leading-[16px]">
            {rialError}
          </div>
        )}
      </div>

      <div className="relative mt-6 mb-6">
        <label className="block mb-2 text-[12px] text-customText2 text-right">
          مقدار طلا
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            maxLength={8}
            inputMode="numeric"
            value={goldInput}
            onChange={handleGoldChange}
            className="w-full font-serif text-[14px] h-[42px] font-bold border text-zinc-700 border-gray-300 rounded-lg p-3 text-right focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:text-zinc-800"
            placeholder="۰"
          />
          <span className="absolute left-4 text-gray-500 text-[10px] font-medium">
           سو
           <span className="absolute top-[-6px] left-[-4px]">ت</span>
          </span>
        </div>

        {goldInput && !goldError && (
          <p className="mt-[8px] text-right text-[11px] font-medium text-readable font-serif">
            معادل {numberToReadableGram(goldAmount)} گرم
          </p>
        )}
        {goldError && (
          <p className="text-err text-[11px] text-right font-medium mt-2 leading-[16px]">
            {goldError}
          </p>
        )}
      </div>
    </>
  );
}
