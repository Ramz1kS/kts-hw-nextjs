import { CartPageStoreContext } from "@/context/CartPageStoreProvider";
import { useStrictContext } from "./useStrictContext";

export const useCartPageStore = () => {
  return useStrictContext({
    context: CartPageStoreContext,
    message: "CartPageStoreContext was not provided",
  });
};
