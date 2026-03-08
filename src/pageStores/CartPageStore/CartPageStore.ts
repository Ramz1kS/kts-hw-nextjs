import { LoadingInfo, ProductData } from "@/shared/types";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import apiPaths from "@/config/apiRoutes";
import type { ListResponse } from "@shared/types";

export default class CartPageStore {
  products: ProductData[] = [];
  loadingInfo: LoadingInfo = {
    isLoading: false,
    isError: false,
    errorCode: "",
  };
  currPage = 1;
  pageSize = 9;

  constructor(initialPage: number = 1) {
    this.currPage = initialPage;
    makeObservable(this, {
      products: observable,
      loadingInfo: observable,
      currPage: observable,
      setPage: action.bound,
      loadProducts: action.bound,
      paginatedProducts: computed,
      maxPage: computed,
      price: computed,
    });
  }

  setPage(page: number) {
    this.currPage = page;
  }

  async loadProducts(productIds: number[]) {
    if (productIds.length === 0) {
      this.products = [];
      this.loadingInfo.isLoading = false;
      return;
    }

    this.loadingInfo.isLoading = true;

    try {
      const uniqueIds = [...new Set(productIds)];
      // подгружаем сразу все товары, чтобы вычислить общую сумму товаров
      const res = await fetch(apiPaths.getProductsByIds(uniqueIds));

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const data: ListResponse = await res.json();

      runInAction(() => {
        this.products = data.data;
        const idCount: { [key: number]: number } = {};
        for (let i = 0; i < productIds.length; i++) {
          const id = productIds[i];
          if (idCount[id]) {
            idCount[id]++;
          } else {
            idCount[id] = 1;
          }
        }
        const keys = Object.keys(idCount);
        for (let j: number = 0; j < keys.length; j++) {
          const infoToDuplicate = this.products.find(
            (p) => p.id === parseInt(keys[j], 10),
          ) as ProductData;

          for (let i = 1; i < idCount[parseInt(keys[j], 10)]; i++)
            this.products.push({ ...infoToDuplicate });
        }
      });
    } catch (e) {
      runInAction(() => {
        this.loadingInfo.isError = true;
        this.loadingInfo.errorCode = e instanceof Error ? e.message : "200";
      });
    } finally {
      runInAction(() => {
        this.loadingInfo.isLoading = false;
      });
    }
  }

  get paginatedProducts() {
    const start = (this.currPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.products.slice(start, end);
  }

  get maxPage() {
    return Math.ceil(this.products.length / this.pageSize);
  }

  get price() {
    return this.products.reduce((total, product) => total + product.price, 0);
  }
}
