import { ProductListQuery } from "@/shared/types";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;
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

export default apiPaths;
