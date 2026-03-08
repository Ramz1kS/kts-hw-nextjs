'use client'

import { ProductPageStore } from "@/pageStores/ProductPageStore/ProductPageStore";
import { LoadingInfo, ProductData } from "@/shared/types";
import { useLocalStore } from "mobx-react-lite";
import React from "react";

export const ProductsPageStoreContext = React.createContext<ProductPageStore | null>(null);

type ProductsPageStoreContextProviderValue = React.PropsWithChildren<{
  initData: ProductData;
  initRelatedData: ProductData[] | undefined;
  loadingInfo?: LoadingInfo;
}>;


export const ProductPageStoreContextProvider: React.FC<
  ProductsPageStoreContextProviderValue
> = ({ children, initData, initRelatedData, loadingInfo }) => {
  const store = useLocalStore(() => new ProductPageStore(initData, initRelatedData, loadingInfo));
  return (
    <ProductsPageStoreContext.Provider value={store}>
      {children}
    </ProductsPageStoreContext.Provider>
  );
};