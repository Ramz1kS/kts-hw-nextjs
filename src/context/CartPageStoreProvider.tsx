"use client";

import CartPageStore from "@/pageStores/CartPageStore/CartPageStore";
import { useLocalStore } from "mobx-react-lite";
import React from "react";

export const CartPageStoreContext = React.createContext<CartPageStore | null>(
  null,
);

type CartPageStoreContextProviderValue = React.PropsWithChildren<{
  initialPage?: number;
}>;

export const CartPageStoreContextProvider: React.FC<
  CartPageStoreContextProviderValue
> = ({ children, initialPage = 1 }) => {
  const store = useLocalStore(() => new CartPageStore(initialPage));
  return (
    <CartPageStoreContext.Provider value={store}>
      {children}
    </CartPageStoreContext.Provider>
  );
};
