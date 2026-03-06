import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import type { ListResponse, ProductData } from '@shared/types';
import RootStore from '../RootStore';
import apiPaths from '@/config/apiRoutes';

const E_COMMERSE_STORAGE_NAME = 'ecommerse_cart';

class CartStore {
  productIds: number[] = [];
  products: ProductData[] = [];
  isLoading = false;
  
  rootStore: RootStore

  constructor(root: RootStore) {
    this.rootStore = root
    makeObservable(this, {
      productIds: observable,
      products: observable,
      isLoading: observable,
      addProductId: action.bound,
      removeProductId: action.bound,
      clear: action.bound,
      loadProducts: action.bound,
      count: computed,
      price: computed,
    });
  }

  hydrate() {
    const saved = localStorage.getItem(E_COMMERSE_STORAGE_NAME)
    if (saved) {
      try {
        this.productIds = JSON.parse(saved)
      } catch {
        this.productIds = []
      }
    }
  }

  addProductId(id: number) {
      this.productIds.push(id);
      localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(this.productIds));
  }

  removeProductId(id: number) {
    const index = this.productIds.indexOf(id);
    if (index > -1) {
      this.productIds.splice(index, 1);
    }
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex > -1) {
      this.products.splice(productIndex, 1);
    }
    localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(this.productIds));
  }

  clear() {
    this.productIds = [];
    this.products = [];
    localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(this.productIds));
  }

async loadProducts() {
    if (this.productIds.length === 0) {
      this.products = []
      return
    }

    this.isLoading = true

    try {
      const uniqueIds = [...new Set(this.productIds)]
      const res = await fetch(apiPaths.getProductsByIds(uniqueIds))
      const data: ListResponse = await res.json()

      runInAction(() => {
        this.products = data.data
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  get count() {
    return this.productIds.length;
  }

  get price() {
    return this.products.reduce((total, product) => total + product.price, 0);
  }
}

export default CartStore