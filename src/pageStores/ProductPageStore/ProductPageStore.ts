import apiPaths, { getRelatedProducts } from "@/config/apiRoutes";
import { loadingDefaultInfo } from "@/config/defaults";
import { LoadingInfo, ProductData } from "@/shared/types";
import { makeObservable, observable } from "mobx";

export const RELATED_COUNT = 3;

export class ProductPageStore {
  data: ProductData | null;
  relatedData: ProductData[] = [];
  loadingInfo: LoadingInfo = loadingDefaultInfo;

  constructor(
    initData: ProductData,
    initRelatedData?: ProductData[] ,
    loadingInfo?: LoadingInfo,
  ) {
    this.data = initData;
    if (initRelatedData) this.relatedData = initRelatedData;
    if (loadingInfo) this.loadingInfo = loadingInfo;
    makeObservable(this, {
      data: observable,
      relatedData: observable,
      loadingInfo: observable,
    });
  }

  static async fetchData(documentId: string) {
    const loadingInfo: LoadingInfo = {
      isLoading: false,
      isError: false,
      errorCode: "",
    };

    try {
      const res = await fetch(apiPaths.getProductURL(documentId))

      if (!res.ok) {
        throw new Error(res.status.toString());
      }
      const product = await res.json();
      const productsRelated = await getRelatedProducts(product.data.productCategory.id)
      return { product, productsRelated, loadingInfo };
    } catch (e) {
      loadingInfo.isError = true;
      loadingInfo.errorCode = e instanceof Error ? e.message : "Unknown error";
      return {
        product: null,
        productsRelated: { data: [] },
        loadingInfo,
      };
    }
  }
}
