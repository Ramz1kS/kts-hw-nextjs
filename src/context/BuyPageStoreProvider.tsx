"use client";

import BuyPageStore from "@/pageStores/BuyPageStore/BuyPageStore";
import { useLocalStore } from "mobx-react-lite";
import React from "react";

export const BuyPageStoreContext = React.createContext<BuyPageStore | null>(
  null,
);

export const BuyPageStoreContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useLocalStore(() => new BuyPageStore());
  return (
    <BuyPageStoreContext.Provider value={store}>
      {children}
    </BuyPageStoreContext.Provider>
  );
};
