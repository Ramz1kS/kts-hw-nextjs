import { action, computed, makeObservable, observable, reaction } from "mobx";
import RootStore from "../RootStore";
import { ObservableMap } from "mobx";

const E_COMMERSE_STORAGE_NAME = "ecommerse_cart";

class CartStore {
  productIds: ObservableMap<number, number> = observable.map();
  isHydrated = false;

  rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeObservable(this, {
      isHydrated: observable,
      addProductId: action.bound,
      removeProductId: action.bound,
      clear: action.bound,
      hydrate: action.bound,
      count: computed,
    });

    reaction(
      () => Array.from(this.productIds.entries()),
      (entries) => {
        localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(entries));
      },
    );
  }

  hydrate() {
    const saved = localStorage.getItem(E_COMMERSE_STORAGE_NAME);
    if (saved) {
      try {
        const entries = JSON.parse(saved);
        this.productIds.replace(entries);
      } catch {
        this.productIds.clear();
      }
    }
    this.isHydrated = true;
  }

  addProductId(id: number) {
    const count = this.productIds.get(id) || 0;
    this.productIds.set(id, count + 1);
  }

  removeProductId(id: number) {
    const count = this.productIds.get(id);
    if (count && count > 1) {
      this.productIds.set(id, count - 1);
    } else {
      this.productIds.delete(id);
    }
  }

  clear() {
    this.productIds.clear();
  }

  get count() {
    return Array.from(this.productIds.values()).reduce(
      (sum, count) => sum + count,
      0,
    );
  }
}

export default CartStore;
