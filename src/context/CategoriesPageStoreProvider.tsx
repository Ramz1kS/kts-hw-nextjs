"use client";

import CategoriesPageStore from "@/pageStores/CategoriesPageStore/CategoriesPageStore";
import { useLocalStore } from "mobx-react-lite";
import React from "react";
import { CategoryData } from "@/shared/types";

export const CategoriesPageStoreContext =
  React.createContext<CategoriesPageStore | null>(null);

type CategoriesPageStoreContextProviderProps = React.PropsWithChildren<{
  categories: CategoryData[];
}>;

export const CategoriesPageStoreContextProvider: React.FC<CategoriesPageStoreContextProviderProps> = ({ children, categories }) => {
  const store = useLocalStore(() => new CategoriesPageStore(categories));
  return (
    <CategoriesPageStoreContext.Provider value={store}>
      {children}
    </CategoriesPageStoreContext.Provider>
  );
};
