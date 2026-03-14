import { BuyPageStoreContextProvider } from "@/context/BuyPageStoreProvider";
import React from "react";
import BuyPageContent from "./content";
import BuyForm from "./form";

type BuyPageQuery = {
  productId?: string;
}

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<BuyPageQuery>;
}) {
  const params = await searchParams
  return (
    <BuyPageStoreContextProvider>
      <BuyPageContent productId={params.productId} />
      <BuyForm />
    </BuyPageStoreContextProvider>
  );
}