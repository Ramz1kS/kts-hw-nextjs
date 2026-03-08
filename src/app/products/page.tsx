import React from "react";
import { ProductsListStoreContextProvider } from "@/context/ProductsListStoreProvider";
import ProductListStore from "@/pageStores/ProductListStore/ProductListStore";
import Text from "@/components/Text";
import ProductsPageContent from "./content";
import { ProductListQuery } from "@/shared/types";

export default async function ProductsLayout({
  searchParams,
}: {
  searchParams: Promise<ProductListQuery>;
}) {
  const params = await searchParams;
  const initData = await ProductListStore.getInitData(params);

  if (initData.isError || initData.data == undefined) {
    return <Text>Error while loading data</Text>;
  }

  return (
    <ProductsListStoreContextProvider
      key={JSON.stringify(await searchParams)}
      initData={initData.data}
      initQuery={params}
    >
      <ProductsPageContent></ProductsPageContent>
    </ProductsListStoreContextProvider>
  );
}
