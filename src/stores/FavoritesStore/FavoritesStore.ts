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

const E_COMMERSE_STORAGE_NAME = "ecommerse_favorites";

class FavoritesStore {
  productIds: Set<number> = new Set<number>()
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
      loadingInfo: observable,
      isHydrated: observable,
      toggleProduct: action.bound,
      removeProductId: action.bound,
      addProductId: action.bound,
      includes: action.bound,
      clear: action.bound,
      hydrate: action.bound,
      count: computed,
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
        this.productIds = new Set<number>();
      }
    }
    this.isHydrated = true;
  }

  toggleProduct(id: number) {
    if (this.productIds.has(id)) {
      this.removeProductId(id);
    } else {
      this.addProductId(id);
    }
  }

  includes(id: number) {
    return this.productIds.has(id);
  }

  addProductId(id: number) {
    this.productIds.add(id);
  }

  removeProductId(id: number) {
    this.productIds.delete(id);
  }

  clear() {
    this.productIds = new Set<number>();
  }

  get count() {
    return this.productIds.size;
  }
}

export default FavoritesStore;
