"use client";

import FavoritesPageStore from "@/pageStores/FavoritesPageStore/FavoritesPageStore";
import { useLocalStore } from "mobx-react-lite";
import React from "react";

export const FavoritesPageStoreContext =
  React.createContext<FavoritesPageStore | null>(null);

type FavoritesPageStoreContextProviderValue = React.PropsWithChildren<{
  initialPage?: number;
}>;

export const FavoritesPageStoreContextProvider: React.FC<
  FavoritesPageStoreContextProviderValue
> = ({ children, initialPage = 1 }) => {
  const store = useLocalStore(() => new FavoritesPageStore(initialPage));
  return (
    <FavoritesPageStoreContext.Provider value={store}>
      {children}
    </FavoritesPageStoreContext.Provider>
  );
};
