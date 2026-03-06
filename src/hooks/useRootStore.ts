import { RootStoreContext } from "@/context/RootStoreContext";
import { useStrictContext } from "./useStrictContext";

export const useRootStore = () => {
  return useStrictContext({
    context: RootStoreContext,
    message: 'RootStoreContext was not provided',
  });
};