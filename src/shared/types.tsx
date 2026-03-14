export type pageName = "Products" | "Categories" | "About us";

export enum SortBy {
  PRICE = "price",
  RATING = "rating",
  NONE = "none"
}

export enum SortHow {
  ASC = "asc",
  DESC = "desc"
}

export type SortByType = "price" | "rating" | "none";
export type SortHowType = "asc" | "desc";

export type Option = {
  key: string;
  name: string;
};

export type NavItem = {
  name: pageName;
  href: string;
};

export type Product = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  image: string;
};

export type ErrorInfo = {
  errorCode: string;
  errorStatus: number;
};

type ProductImageData = {
  id: number;
  url: string;
};

export type ProductImage = {
  id: number;
  url: string;
  formats: {
    large: ProductImageData;
    medium: ProductImageData;
    small: ProductImageData;
  };
};

export type MetaData = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type ProductData = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  rating: number;
  isInStock: boolean;
  productCategory: {
    title: string;
  };
  images: ProductImage[];
};

export type CategoryData = {
  id: number;
  documentId: string;
  title: string;
};

export type ListResponse = {
  data: ProductData[];
  meta: MetaData;
};

export type ProductPageResponse = {
  data: ProductData;
  meta: MetaData;
};

export type CategoryResponse = {
  data: CategoryData[];
  meta: MetaData;
};

export type ProductsListStoreInitData = {
  products: ProductData[];
  total: number;
  currPage: number;
  maxPage: number;
  filtersCategory: CategoryData[];
};

export type ProductListQuery = {
  page: string | undefined;
  searchQuery: string | undefined;
  inStockOnly: string | undefined;
  categories: string | undefined;
  sortBy: string | undefined;
  sortHow: string | undefined;
};

export type LoadingInfo = {
  isLoading: boolean;
  isError: boolean;
  errorCode: string;
};
