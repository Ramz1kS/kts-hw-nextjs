import apiPaths from "@/config/apiRoutes";
import { LoadingInfo, ProductData } from "@/shared/types";
import { makeObservable, observable } from "mobx";

export class ProductPageStore {
    data: ProductData
    relatedData: ProductData[] = []
    loadingInfo: LoadingInfo = {
        isLoading: false,
        isError: false,
        errorCode: '',
    }

    constructor(initData: ProductData, initRelatedData: ProductData[] | undefined, loadingInfo?: LoadingInfo) {
        this.data = initData
        if (initRelatedData) this.relatedData = initRelatedData
        if (loadingInfo) this.loadingInfo = loadingInfo
        makeObservable(this, {
            data: observable,
            relatedData: observable,
            loadingInfo: observable
        })
    }

    static async fetchData(documentId: string) {
        const loadingInfo: LoadingInfo = {
            isLoading: false,
            isError: false,
            errorCode: '',
        }

        try {
            const [res, resRelated] = await Promise.all(
                [fetch(apiPaths.getProductURL(documentId)),
                fetch(`${apiPaths.products}&pagination[pageSize]=3`)])

            if (!res.ok) {
                throw new Error(res.status.toString())
            }
            const [product, productsRelated] = await Promise.all([res.json(), resRelated.json()])
            return {product, productsRelated, loadingInfo}
        } catch (e) {
            loadingInfo.isError = true
            loadingInfo.errorCode = e instanceof Error ? e.message : '200'
            return {product: {data: {} as ProductData}, productsRelated: {data: []}, loadingInfo}
        }
    }
}