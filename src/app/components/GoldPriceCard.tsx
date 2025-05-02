"use client";

import { useGoldStore } from "../stores/useGoldStore";
import Image from "next/image";
import Link from "next/link";

export const GoldPriceCard = () => {
  const { goldPrice, rate } = useGoldStore();

  const priceChange = rate * 1;
  const isIncrease = priceChange > 0;
  const isDecrease = priceChange < 0;
  const isNoChange = priceChange === 0;

  const changeColor = isIncrease
    ? "text-green-600"
    : isDecrease
    ? "text-red-600"
    : "text-gray-500";

  return (
    <>
      <div className="relative mb-8 mt-7">
        <Link href="#" className="absolute right-5 top-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className=" right-[16px] shrink-0"
            strokeWidth="currentColor">
            <path
              d="M13.985 5.69844C14.1592 5.69844 14.3333 5.76261 14.4708 5.90011L20.035 11.4643C20.3008 11.7301 20.3008 12.1701 20.035 12.4359L14.4708 18.0001C14.205 18.2659 13.765 18.2659 13.4991 18.0001C13.2333 17.7343 13.2333 17.2943 13.4991 17.0284L18.5775 11.9501L13.4991 6.87177C13.2333 6.60594 13.2333 6.16594 13.4991 5.90011C13.6275 5.76261 13.8108 5.69844 13.985 5.69844Z"
              fill="#333333"
              strokeWidth="#333333"></path>
            <path
              d="M3.68775 11.3125L19.1152 11.3125C19.4911 11.3125 19.8027 11.6242 19.8027 12C19.8027 12.3758 19.4911 12.6875 19.1152 12.6875L3.68775 12.6875C3.31192 12.6875 3.00025 12.3758 3.00025 12C3.00025 11.6242 3.31192 11.3125 3.68775 11.3125Z"
              fill="#333333"
              strokeWidth="#333333"></path>
          </svg>
        </Link>

        <h1 className="text-center text-customText font-medium text-[18px]">
          خرید و فروش طلا
        </h1>
      </div>
      <div className="w-full px-3 sm:px-0 flex justify-center mb-6">
        <div className="w-[576px] h-[54px] flex items-center justify-between bg-goldPriceCard rounded-lg shadow-md px-2.5">
          <div>
            <div>
              <span className="text-customText3 text-[10px] font-medium pr-1">
                ریال
              </span>
              <span dir="rtl" className="text-[12px] font-medium text-zinc-900">
                {goldPrice
                  ? `${goldPrice.toLocaleString("fa-IR")}`
                  : "در حال دریافت..."}
              </span>
            </div>
            
            {!isNoChange ? (
              <div className="flex items-center mt-1">
                <Image
                  src="/images/Arrow-Down-Gold.svg"
                  alt="change-icon"
                  width={16}
                  height={16}
                  className={`transition-transform duration-300 ${
                    isIncrease ? "rotate-180" : ""
                  }`}
                  style={{
                    filter: isIncrease
                      ? "invert(43%) sepia(94%) saturate(350%) hue-rotate(89deg)"
                      : "invert(27%) sepia(93%) saturate(744%) hue-rotate(345deg)",
                  }}
                />
                <span className={`text-xs font-medium ${changeColor}`}>
                  {Math.abs(priceChange).toLocaleString("fa-IR", {
                    maximumFractionDigits: 2,
                  })}
                  ٪
                </span>
              </div>
            ) : (
              <span className="text-[10px] font-medium text-gray-500 mt-1 block">
                ۰ %
              </span>
            )}
          </div>

          <div className="flex">
            <div className="flex flex-col mr-2 text-right gap-0.5">
              <span className="text-[11px] text-gray-600 font-bold">
                قیمت حال حاضر یک سوت طلا
              </span>
              <span className="self-end text-[10px] text-customText3">
                طلای ۱۸ عیار
              </span>
            </div>
            <Image
              src="/images/Current-gold-price.svg"
              alt="gold"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </>
  );
};
