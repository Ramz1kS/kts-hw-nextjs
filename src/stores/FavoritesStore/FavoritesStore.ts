import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import type { ListResponse, LoadingInfo, ProductData } from '@shared/types';
import RootStore from '../RootStore';
import apiPaths from '@/config/apiRoutes';

const E_COMMERSE_STORAGE_NAME = 'ecommerse_favorites';

class FavoritesStore {
  productIds: number[] = [];
  products: ProductData[] = [];
  loadingInfo: LoadingInfo = {
    isLoading: false,
    isError: false,
    errorCode: '',
  };
  isHydrated = false;
  
  rootStore: RootStore

  constructor(root: RootStore) {
    this.rootStore = root
    makeObservable(this, {
      productIds: observable,
      products: observable,
      loadingInfo: observable,
      isHydrated: observable,
      toggleProduct: action.bound,
      removeProductId: action.bound,
      addProductId: action.bound,
      includes: action.bound,
      clear: action.bound,
      loadProducts: action.bound,
      hydrate: action.bound,
      count: computed,
    });
    reaction(
      () => this.productIds.slice(),
      (ids) => {
        localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(ids));
      }
    );
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
    this.isHydrated = true
  }

  toggleProduct(id: number) {
    if (this.productIds.includes(id)) {
      this.removeProductId(id)
    } else {
      this.addProductId(id)
    }
  }

  includes(id: number) {
    return this.productIds.includes(id)
  }

  addProductId(id: number) {
      this.productIds.push(id);
  }

  removeProductId(id: number) {
    const index = this.productIds.indexOf(id);
    if (index > -1) {
      this.products = this.products.filter(item => item.id !== id)
      this.productIds.splice(index, 1);
    }
  }

  clear() {
    this.productIds = [];
    this.products = [];
  }

  async loadProducts() {
    if (this.productIds.length === 0) {
      this.products = []
      this.loadingInfo.isLoading = false
      return
    }

    this.loadingInfo.isLoading = true

    try {
      const uniqueIds = [...new Set(this.productIds)]
      const res = await fetch(apiPaths.getProductsByIds(uniqueIds))
      
      if (!res.ok) {
        throw new Error(res.status.toString())
      }
      
      const data: ListResponse = await res.json()

      runInAction(() => {
        this.products = data.data
      })
    } catch (e) {
      runInAction(() => {
        this.loadingInfo.isError = true
        this.loadingInfo.errorCode = e instanceof Error ? e.message : '200'
      })
    } finally {
      runInAction(() => {
        this.loadingInfo.isLoading = false
      })
    }
  }

  get count() {
    return this.productIds.length;
  }

}

export default FavoritesStore