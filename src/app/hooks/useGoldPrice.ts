import { useEffect } from "react";
import { useGoldStore } from "../stores/useGoldStore";

export function useGoldPrice() {
    const setGoldPrice = useGoldStore((state) => state.setGoldPrice)
    const setRate = useGoldStore(state => state.setRate);

    useEffect(() => {
      const fetchGoldPrice = async () => {
        try {
          const response = await fetch(
            "https://testapi.shemsh.gold/api/app/gold/price"
          );
          const data = await response.json();
          if (data?.price) {
            setGoldPrice(data.price);
          }
          if (data?.rate) {
            setRate(data.rate);
          }
        } catch (error) {
          console.log("خطا در دریافت قیمت طلا", error);
        }
      };

      fetchGoldPrice();

      const interval = setInterval(fetchGoldPrice, 30000);

      return () => clearInterval(interval);
    }, [setGoldPrice, setRate]);
} 