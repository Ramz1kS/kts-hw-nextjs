import React from 'react';
import ProductInfo from './components/ProductInfo';
import RelatedItems from './components/RelatedItems';
import apiPaths from '@config/apiRoutes'
import { ProductPageStoreContextProvider } from '@/context/ProductsPageStoreProvider';
import { useProductPageStore } from '@/hooks/useProductPageStore';
import { ProductPageStore } from '@/pageStores/ProductPageStore/ProductPageStore';
import { redirect } from 'next/navigation';
import { errorLink } from '@/config/navConfig';

type ProductPageProps = {
    params: Promise<{documentId: string}>
}

export default async function ProductPage ({ params }: ProductPageProps) {
    const { documentId } = await params
    const { product, productsRelated, loadingInfo } = await ProductPageStore.fetchData(documentId)
    
    if (loadingInfo.isError)
        redirect(errorLink(loadingInfo.errorCode))
    return (
        <ProductPageStoreContextProvider 
        initData={product.data} initRelatedData={productsRelated.data} loadingInfo={loadingInfo}>
            <ProductInfo />
            <RelatedItems />
        </ProductPageStoreContextProvider>
  );
};