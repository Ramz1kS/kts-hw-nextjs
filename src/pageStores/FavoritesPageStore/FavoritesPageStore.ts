import { LoadingInfo, ProductData } from "@/shared/types";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { loadingDefaultInfo } from "@/config/defaults";
import { loadProductsByIds } from "@/shared/productLoader";

export default class FavoritesPageStore {
  allProducts: Map<number, ProductData> = new Map();
  loadingInfo: LoadingInfo = loadingDefaultInfo;
  currPage = 1;
  pageSize = 9;

  constructor(initialPage: number = 1) {
    this.currPage = initialPage;
    makeObservable(this, {
      allProducts: observable,
      loadingInfo: observable,
      currPage: observable,
      setPage: action.bound,
      loadProducts: action.bound,
      removeProductId: action.bound,
      paginatedProducts: computed,
      maxPage: computed,
      totalCount: computed,
    });
  }

  setPage(page: number) {
    this.currPage = page;
  }

  async loadProducts(productIds: Set<number>) {
    if (productIds.size === 0) {
      this.allProducts.clear();
      this.loadingInfo.isLoading = false;
      return;
    }

    this.loadingInfo.isLoading = true;

    try {
      const uniqueIds = Array.from(productIds);
      const products = await loadProductsByIds(uniqueIds);

      runInAction(() => {
        this.allProducts.clear();
        products.forEach((product) => {
          this.allProducts.set(product.id, product);
        });
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

  removeProductId(id: number) {
    this.allProducts.delete(id);
    const start = (this.currPage - 1) * this.pageSize;
    const totalItems = this.totalCount;
    if (start >= totalItems && this.currPage > 1) {
      this.currPage -= 1;
    }
  }

  get totalCount() {
    return this.allProducts.size;
  }

  get paginatedProducts() {
    const allItems = Array.from(this.allProducts.values());
    const start = (this.currPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return allItems.slice(start, end);
  }

  get maxPage() {
    return Math.ceil(this.totalCount / this.pageSize);
  }
}
