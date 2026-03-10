import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import type { ListResponse, LoadingInfo, ProductData } from "@shared/types";
import RootStore from "../RootStore";
import apiPaths from "@/config/apiRoutes";

const E_COMMERSE_STORAGE_NAME = "ecommerse_cart";

class CartStore {
  productIds: Map<number, number> = new Map<number, number>()
  products: Map<number, ProductData> = new Map<number, ProductData>();
  loadingInfo: LoadingInfo = {
    isLoading: false,
    isError: false,
    errorCode: "",
  };
  isHydrated = false;

  rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeObservable(this, {
      productIds: observable,
      products: observable,
      loadingInfo: observable,
      isHydrated: observable,
      addProductId: action.bound,
      removeProductId: action.bound,
      clear: action.bound,
      loadProducts: action.bound,
      hydrate: action.bound,
      count: computed,
      price: computed,
    });

    reaction(
      () => this.productIds,
      (ids) => {
        localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(ids));
      },
    );
  }

  hydrate() {
    const saved = localStorage.getItem(E_COMMERSE_STORAGE_NAME);
    if (saved) {
      try {
        this.productIds = JSON.parse(saved);
      } catch {
        this.productIds = new Map<number, number>();
      }
    }
    this.isHydrated = true;
  }

  addProductId(id: number) {
    this.productIds.set(id, (this.productIds.get(id) || 0));
  }

  removeProductId(id: number) {
    this.productIds.delete(id);
    // const index = this.productIds.indexOf(id);
    // if (index > -1) {
    //   this.productIds.splice(index, 1);
    // }
    // const productIndex = this.products.findIndex((p) => p.id === id);
    // if (productIndex > -1) {
    //   this.products.splice(productIndex, 1);
    // }
  }

  clear() {
    this.productIds
  }

  async loadProducts() {
    if (Object.keys(this.productIds).length == 0) {
      this.products = new Map<number, ProductData>;
      this.loadingInfo.isLoading = false;
      return;
    }

    this.loadingInfo.isLoading = true;

    try {
      const uniqueIds = [...this.productIds.keys()];
      const res = await fetch(apiPaths.getProductsByIds(uniqueIds));

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const data: ListResponse = await res.json();

      runInAction(() => {
        for (let i = 0; i < data.data.length; i++) {
          this.products.set(data.data[i].id, data.data[i]);
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

  get count() {
    return this.productIds.keys().reduce((acc, id) => acc + (this.productIds.get(id) || 0), 0);
  }

  get price() {
    return this.productIds.keys().reduce((acc, id) => acc + (this.productIds.get(id) || 0) * (this.products.get(id)?.price || 0), 0);
  }
}

export default CartStore;
