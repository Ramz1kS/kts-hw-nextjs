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

export default class CartPageStore {
  allProducts: Map<number, { data: ProductData; count: number }> = new Map();
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
      validatePage: action.bound,
      maxPage: computed,
      price: computed,
      paginatedProducts: computed,
      totalCount: computed,
    });
  }

  setPage(val: number) {
    if (val < 1) this.currPage = 1;
    else if (val > this.maxPage) this.currPage = this.maxPage;
    else this.currPage = val;
  }

  async loadProducts(productIdsMap: Map<number, number>) {
    if (productIdsMap.size === 0) {
      this.allProducts.clear();
      this.loadingInfo.isLoading = false;
      return;
    }

    this.loadingInfo.isLoading = true;

    try {
      const uniqueIds = Array.from(productIdsMap.keys());
      const products = await loadProductsByIds(uniqueIds);

      runInAction(() => {
        this.allProducts.clear();
        products.forEach((product) => {
          const count = productIdsMap.get(product.id) || 1;
          this.allProducts.set(product.id, {
            data: product,
            count: count,
          });
        });
        this.validatePage();
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

  validatePage() {
    if (this.maxPage === 0) true;
    if (this.currPage > this.maxPage) {
      this.currPage = this.maxPage;
      return false;
    }
    if (this.currPage < 1) {
      this.currPage = 1;
      return false;
    }
    return true;
  }

  removeProductId(id: number) {
    const item = this.allProducts.get(id);
    if (!item) return;
    if (item.count > 1) {
      this.allProducts.set(id, { data: item.data, count: item.count - 1 });
    } else {
      this.allProducts.delete(id);
    }
    const start = (this.currPage - 1) * this.pageSize;
    const totalItems = this.totalCount;
    if (start >= totalItems && this.currPage > 1) {
      this.currPage -= 1;
    }
  }

  get totalCount() {
    return Array.from(this.allProducts.values()).reduce(
      (sum, { count }) => sum + count,
      0,
    );
  }

  get paginatedProducts() {
    const allItems: ProductData[] = [];
    this.allProducts.forEach(({ data }) => {
      allItems.push(data);
    });

    const start = (this.currPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return allItems.slice(start, end);
  }

  get maxPage() {
    return Math.ceil(Array.from(this.allProducts.values()).length / this.pageSize);
  }

  get price() {
    let total = 0;
    this.allProducts.forEach(({ data, count }) => {
      total += data.price * count;
    });
    return total;
  }
}
