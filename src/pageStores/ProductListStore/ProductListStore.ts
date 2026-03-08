import apiPaths from "@/config/apiRoutes";
import {
  CategoryData,
  CategoryResponse,
  ListResponse,
  ProductData,
  ProductListQuery,
  ProductsListStoreInitData,
  SortByType,
  SortHowType,
} from "@/shared/types";
import { action, makeObservable, observable } from "mobx";
import { Option } from "@/shared/types";

export default class ProductListStore {
  products: ProductData[] = [];
  total = 0;
  currPage = 1;
  maxPage = 1;
  inStockOnly = false;
  searchQuery = "";
  filtersCategory: CategoryData[] = [];
  selectedFiltersCategory: CategoryData[] = [];
  priceSort: string | null = null;
  ratingSort: string | null = null;
  isError: boolean = false;
  errorCode: string = "";
  sortHow: Option[] = [
    { key: "desc", name: "High to low" },
    { key: "asc", name: "Low to high" },
  ];

  sortBy: Option[] = [
    { key: "none", name: "Don't" },
    { key: "price", name: "Price" },
    { key: "rating", name: "Rating" },
  ];

  selectedSortHow: SortHowType = "desc";
  selectedSortBy: SortByType = "none";

  constructor(
    initData?: ProductsListStoreInitData,
    initQuery: ProductListQuery | undefined = undefined,
  ) {
    if (initData) {
      this.products = initData.products;
      this.total = initData.total;
      this.currPage = initData.currPage;
      this.maxPage = initData.maxPage;
      this.filtersCategory = initData.filtersCategory;
    }
    if (initQuery) {
      this.searchQuery = initQuery.searchQuery ?? "";
      this.inStockOnly = initQuery.inStockOnly === "true";

      const selectedFiltersIds =
        initQuery.categories !== undefined
          ? initQuery.categories?.split(",").map((i) => parseInt(i, 10))
          : [];

      this.selectedFiltersCategory = this.filtersCategory.filter((c) =>
        selectedFiltersIds.includes(c.id),
      );
      this.setSortHow(initQuery.sortHow ?? "desc");
      this.setSortBy(initQuery.sortBy ?? "none");
    }
    makeObservable(this, {
      products: observable,
      total: observable,
      currPage: observable,
      maxPage: observable,
      inStockOnly: observable,
      searchQuery: observable,
      selectedFiltersCategory: observable,
      priceSort: observable,
      ratingSort: observable,
      selectedSortBy: observable,
      selectedSortHow: observable,
      sortBy: observable,
      sortHow: observable,
      setSearchQuery: action.bound,
      setInStockOnly: action.bound,
      setSelectedCategories: action.bound,
      setSortBy: action.bound,
      setSortHow: action.bound,
      getURLSearchParams: action.bound,
      setPage: action.bound,
    });
  }

  setPage(val: number) {
    if (val < 1) this.currPage = 1;
    else if (val > this.maxPage) this.currPage = this.maxPage;
    else this.currPage = val;
    window.scrollTo(0, 0);
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  setSelectedCategories(categories: CategoryData[]) {
    this.selectedFiltersCategory = categories;
  }

  setInStockOnly(val: boolean) {
    this.inStockOnly = val;
  }

  setSortHow(val: string) {
    if (["asc", "desc"].includes(val)) {
      this.selectedSortHow = val as SortHowType;
    } else {
      this.selectedSortHow = "asc";
    }
  }

  setSortBy(val: string) {
    if (["none", "price", "rating"].includes(val)) {
      this.selectedSortBy = val as SortByType;
    } else {
      this.selectedSortBy = "none";
    }
  }

  getURLSearchParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.set("inStockOnly", this.inStockOnly.toString());
    if (this.searchQuery !== "") {
      params.set("searchQuery", this.searchQuery);
    }
    if (this.selectedFiltersCategory.length !== 0) {
      params.set(
        "categories",
        this.selectedFiltersCategory.map((c) => c.id).join(","),
      );
    }
    if (this.selectedSortBy !== "none") {
      params.set("sortBy", this.selectedSortBy);
      params.set("sortHow", this.selectedSortHow);
    }
    params.set("page", this.currPage.toString());
    return params;
  }

  static fromJson(
    initData: ProductsListStoreInitData,
    initQuery: ProductListQuery,
  ) {
    return new ProductListStore(initData, initQuery);
  }

  static async getInitData(
    params: ProductListQuery,
  ): Promise<{
    data: ProductsListStoreInitData | undefined;
    isError: boolean;
    errorCode: string;
  }> {
    console.log(params);
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(apiPaths.getProductsURL(params), { next: { revalidate: 0 } }),
      fetch(apiPaths.categories, { next: { revalidate: 60 } }),
    ]);

    let isError = false;

    if (productsRes.status != 200 || categoriesRes.status != 200) {
      isError = true;
      return {
        data: undefined,
        isError: isError,
        errorCode: productsRes.statusText,
      };
    }

    const productsData: ListResponse = await productsRes.json();
    const categoriesData: CategoryResponse = await categoriesRes.json();

    // бесконечного цикла здесь не должно быть, мы же просто правим параметры
    // запроса и делаем новый запрос. если количество страниц нулевое, но оставляем как есть
    // если вдруг query параметры плохие - запросим снова с правильными
    if (productsData.meta.pagination.pageCount != 0) {
      if (
        productsData.meta.pagination.page >
        productsData.meta.pagination.pageCount
      )
        return this.getInitData({
          ...params,
          page: productsData.meta.pagination.pageCount.toString(),
        });
      if (productsData.meta.pagination.page < 1)
        return this.getInitData({ ...params, page: "1" });
    }

    const initData: ProductsListStoreInitData = {
      products: productsData.data,
      total: productsData.meta.pagination.total,
      currPage: productsData.meta.pagination.page,
      maxPage: productsData.meta.pagination.pageCount,
      filtersCategory: categoriesData.data,
    };
    return {
      data: initData,
      isError: isError,
      errorCode: "",
    };
  }
}
