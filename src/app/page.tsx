"use client";

import { GoldPriceCard } from "@/app/components/GoldPriceCard";
import { BuySellSwitcher } from "@/app/components/BuySellSwitcher";
import { GoldBuyForm } from "@/app/components/GoldBuyForm";
import { useGoldPrice } from "./hooks/useGoldPrice";
import { SubmitButton } from "./components/SubmitButton";
import { useGoldStore } from "./stores/useGoldStore";

export default function Home() {
  const { rialAmount, goldAmount } = useGoldStore();
  useGoldPrice();
  return (
    <main className="flex justify-center items-center h-full w-full bg-gray-50">
      <div className="relative w-full sm:w-[600px] h-screen bg-white shadow-xl flex flex-col">
        <div className="w-full mx-auto">
          <GoldPriceCard />
        </div>
        <div className="flex flex-col flex-grow justify-between">
          <div className="bg-white p-6">
            <BuySellSwitcher />
            <GoldBuyForm />
          </div>
          <div className="py-4 px-6 border-t bg-gray-50 border-t-border">
            <SubmitButton
              disabled={rialAmount === 0 || goldAmount === 0}
              onClick={() => console.log("خرید انجام شد")}
            />
          </div>
        </div>
      </div>
    </main>
  );
}



