import { ProductsPageStoreContext } from "@/context/ProductsPageStoreProvider";
import { useStrictContext } from "./useStrictContext";

export const useProductPageStore = () => {
  return useStrictContext({
    context: ProductsPageStoreContext,
    message: "RootStoreContext was not provided",
  });
};
