import { LoadingInfo, ProductData } from "@/shared/types";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import apiPaths from '@/config/apiRoutes';
import type { ListResponse } from '@shared/types';

export default class FavoritesPageStore {
  products: ProductData[] = []
  totalCount = 0
  loadingInfo: LoadingInfo = {
    isLoading: false,
    isError: false,
    errorCode: '',
  }
  currPage = 1
  pageSize = 9

  constructor(initialPage: number = 1) {
    this.currPage = initialPage
    makeObservable(this, {
      products: observable,
      totalCount: observable,
      loadingInfo: observable,
      currPage: observable,
      setPage: action.bound,
      loadProducts: action.bound,
      maxPage: computed,
    })
  }

  setPage(page: number) {
    this.currPage = page
  }

  async loadProducts(productIds: number[]) {
    if (productIds.length === 0) {
      this.products = []
      this.totalCount = 0
      this.loadingInfo.isLoading = false
      return
    }

    this.loadingInfo.isLoading = true
    this.totalCount = productIds.length

    try {
      const start = (this.currPage - 1) * this.pageSize
      const end = start + this.pageSize
      const pageIds = productIds.slice(start, end)
      const uniqueIds = [...new Set(pageIds)]
      
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

  get maxPage() {
    return Math.ceil(this.totalCount / this.pageSize)
  }
}
