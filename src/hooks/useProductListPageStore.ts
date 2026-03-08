import { ProductsListStoreContext } from "@/context/ProductsListStoreProvider";
import { useStrictContext } from "./useStrictContext";

export const useProductListPageStore = () => {
  return useStrictContext({
    context: ProductsListStoreContext,
    message: "ProductsListStoreContext was not provided",
  });
};
