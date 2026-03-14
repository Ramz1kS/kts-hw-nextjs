import { useStrictContext } from "./useStrictContext";
import { BuyPageStoreContext } from "@/context/BuyPageStoreProvider";

export const useBuyPageStore = () => {
  return useStrictContext({
    context: BuyPageStoreContext,
    message: "BuyPageStoreContext was not provided",
  });
};
