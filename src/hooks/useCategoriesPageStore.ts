import { CategoriesPageStoreContext } from "@/context/CategoriesPageStoreProvider";
import { useStrictContext } from "./useStrictContext";

export const useCategoriesPageStore = () => {
  return useStrictContext({
    context: CategoriesPageStoreContext,
    message: "CategoriesPageStoreContext was not provided",
  });
};
