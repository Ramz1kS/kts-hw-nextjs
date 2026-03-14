import { ListResponse, ProductData, ProductListQuery } from "@/shared/types";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;
const RELATED_COUNT = 3;
const IMAGES_CATEGORIES = "populate[0]=images&populate[1]=productCategory";

const apiPaths = {
  products: `${API_DOMAIN}/api/products?${IMAGES_CATEGORIES}`,
  getProductsURL: (params: ProductListQuery) => {
    const baseUrl = `${API_DOMAIN}/api/products?${IMAGES_CATEGORIES}&pagination[pageSize]=9`;
    let paramString = "";
    paramString += params.page
      ? `&pagination[page]=${params.page}`
      : "&pagination[page]=1";
    paramString +=
      params.inStockOnly == "true" ? "&filters[isInStock][$eq]=true" : "";
    paramString += params.searchQuery
      ? `&filters[title][$containsi]=${params.searchQuery}`
      : "";
    paramString += params.categories
      ? params.categories
          .split(",")
          .map((id, i) => `&filters[productCategory][id][$in][${i}]=${id}`)
          .join("")
      : "";
    paramString +=
      params.sortBy && params.sortBy != "none" ? `&sort=${params.sortBy}` : "";
    paramString +=
      params.sortBy && params.sortBy != "none" && params.sortHow
        ? `:${params.sortHow}`
        : "";
    return baseUrl + paramString;
  },
  getProductURL: (documentId: string) =>
    `${API_DOMAIN}/api/products/${documentId}?populate[0]=images&populate[1]=productCategory`,
  getProductsByIds: (
    ids: number[],
    pageSize: number = ids.length,
    pageNumber: number = 1,
  ) => {
    const params = ids.map((id, i) => `filters[id][$in][${i}]=${id}`).join("&");

    return `${API_DOMAIN}/api/products?populate[0]=images&populate[1]=productCategory&${params}&pagination[pageSize]=${pageSize}&pagination[page]=${pageNumber}`;
  },
  categories: `${API_DOMAIN}/api/product-categories`,
};

export async function getRelatedProducts(categoryId: number): Promise<ListResponse> {
  const urlIds = `${API_DOMAIN}/api/products?fields=id&populate=productCategory&filters[productCategory][id][$eq]=${categoryId}`;
  const resIds = await fetch(urlIds);
  if (!resIds.ok) throw new Error(`${resIds.status}`)
  const dataIds: ListResponse = await resIds.json()
  const shuffledIds = dataIds.data.sort(() => 0.5 - Math.random()).map((item) => item.id)
  console.log(shuffledIds)
  const urlRelated = apiPaths.getProductsByIds(shuffledIds.slice(0, 3))
  console.log(urlRelated)
  const resRelated = await fetch(urlRelated)
  if (!resRelated.ok) throw new Error(`${resRelated.status}`)
  const dataRelated: ListResponse = await resRelated.json()
  return dataRelated;
}

export default apiPaths;
