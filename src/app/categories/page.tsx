import { CategoriesPageStoreContextProvider } from "@/context/CategoriesPageStoreProvider";
import CategoriesContent from "./content";
import apiPaths from "@/config/apiRoutes";
import { CategoryResponse } from "@/shared/types";
import { redirect } from "next/navigation";
import { errorLink } from "@/config/navConfig";

export const metadata = {
  title: 'Categories',
  description: 'Browse product categories',
}

export default async function CategoriesPage() {
  const res = await fetch(apiPaths.categories, { next: { revalidate: 60 } });
  if (!res.ok) {
    redirect(errorLink(res.status.toString()));
  }
  const data: CategoryResponse = await res.json();
  return (
    <CategoriesPageStoreContextProvider categories={data.data}>
      <CategoriesContent />
    </CategoriesPageStoreContextProvider>
  );
}
