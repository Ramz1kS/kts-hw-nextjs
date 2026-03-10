import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import RootStore from "../RootStore";

const E_COMMERSE_STORAGE_NAME = "ecommerse_favorites";

class FavoritesStore {
  productIds: number[] = [];
  isHydrated = false;

  rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeObservable(this, {
      productIds: observable,
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
      () => this.productIds.slice(),
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
        this.productIds = [];
      }
    }
    this.isHydrated = true;
  }

  toggleProduct(id: number) {
    if (this.productIds.includes(id)) {
      this.removeProductId(id);
    } else {
      this.addProductId(id);
    }
  }

  includes(id: number) {
    return this.productIds.includes(id);
  }

  addProductId(id: number) {
    this.productIds.push(id);
  }

  removeProductId(id: number) {
    const index = this.productIds.indexOf(id);
  }

  clear() {
    this.productIds = [];
  }

  get count() {
    return this.productIds.length;
  }
}

export default FavoritesStore;
