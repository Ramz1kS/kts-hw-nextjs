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
  productIds = observable.set<number>([]);
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
      loadingInfo: observable,
      isHydrated: observable,
      toggleProduct: action.bound,
      removeProductId: action.bound,
      addProductId: action.bound,
      clear: action.bound,
      hydrate: action.bound,
      count: computed,
    });
    reaction(
      () => Array.from(this.productIds),
      (ids) => {
        localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(ids));
      },
    );
  }

  hydrate() {
    const saved = localStorage.getItem(E_COMMERSE_STORAGE_NAME);
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        this.productIds.replace(ids);
      } catch {
        this.productIds = observable.set<number>([]);
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

  addProductId(id: number) {
    this.productIds.add(id);
  }

  removeProductId(id: number) {
    this.productIds.delete(id);
  }

  clear() {
    this.productIds = observable.set<number>([]);
  }

  get count() {
    return this.productIds.size;
  }
}

export default FavoritesStore;
