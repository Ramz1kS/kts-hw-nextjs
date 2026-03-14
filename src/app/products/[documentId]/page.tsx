import React from "react";
import ProductInfo from "./components/ProductInfo";
import RelatedItems from "./components/RelatedItems";
import { ProductPageStoreContextProvider } from "@/context/ProductsPageStoreProvider";
import { ProductPageStore } from "@/pageStores/ProductPageStore/ProductPageStore";
import { redirect } from "next/navigation";
import { errorLink } from "@/config/navConfig";
import type { Metadata } from "next";

type ProductPageProps = {
  params: Promise<{ documentId: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { documentId } = await params;
  const { product, loadingInfo } = await ProductPageStore.fetchData(documentId);

  if (loadingInfo.isError || !product.data) {
    return {
      title: "Product was not found",
    };
  }

  return {
    title: product.data.title,
    description: product.data.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { documentId } = await params;
  const { product, productsRelated, loadingInfo } =
    await ProductPageStore.fetchData(documentId);

  if (loadingInfo.isError) redirect(errorLink(loadingInfo.errorCode));
  return (
    <ProductPageStoreContextProvider
      initData={product.data}
      initRelatedData={productsRelated.data}
      loadingInfo={loadingInfo}
    >
      <ProductInfo />
      <RelatedItems />
    </ProductPageStoreContextProvider>
  );
}
