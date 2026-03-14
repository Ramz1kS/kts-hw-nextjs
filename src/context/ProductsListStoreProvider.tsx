"use client";

import ProductListStore from "@/pageStores/ProductListStore/ProductListStore";
import { ProductListQuery, ProductsListStoreInitData } from "@/shared/types";
import { useLocalStore } from "mobx-react-lite";
import React from "react";

type ProductsListStoreContextProviderValue = React.PropsWithChildren<{
  initData: ProductsListStoreInitData;
  initQuery: ProductListQuery;
}>;

export const ProductsListStoreContext =
  React.createContext<ProductListStore | null>(null);

export const ProductsListStoreContextProvider: React.FC<
  ProductsListStoreContextProviderValue
> = ({ children, initData, initQuery }) => {
  const store = useLocalStore(() =>
    ProductListStore.fromJson(initData, initQuery),
  );
  return (
    <ProductsListStoreContext.Provider value={store}>
      {children}
    </ProductsListStoreContext.Provider>
  );
};
