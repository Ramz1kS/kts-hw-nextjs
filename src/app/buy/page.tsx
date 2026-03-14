import { BuyPageStoreContextProvider } from "@/context/BuyPageStoreProvider";
import React from "react";
import BuyPageContent from "./content";
import BuyForm from "./form";

export default async function BuyPage() {
  return (
    <BuyPageStoreContextProvider>
      <BuyPageContent />
      <BuyForm />
    </BuyPageStoreContextProvider>
  );
}