import apiPaths from "@/config/apiRoutes";
import { ListResponse, ProductData } from "@/shared/types";

export async function loadProductsByIds(productIds: number[]): Promise<ProductData[]> {
  const res = await fetch(apiPaths.getProductsByIds(productIds));

  if (!res.ok) {
    throw new Error(res.status.toString());
  }

  const data: ListResponse = await res.json();
  return data.data;
}
