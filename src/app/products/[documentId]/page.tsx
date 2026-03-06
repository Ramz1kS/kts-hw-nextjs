import React from 'react';
import ProductInfo from './components/ProductInfo';
import RelatedItems from './components/RelatedItems';
import apiPaths from '@config/apiRoutes'

type ProductPageProps = {
    params: Promise<{documentId: string}>
}

export default async function ProductPage ({ params }: ProductPageProps) {
    const { documentId } = await params
    const res = await fetch(apiPaths.getProductURL(documentId), { next: { revalidate: 60 } })
    const product = await res.json()

    const resRelated = await fetch(`${apiPaths.products}&pagination[pageSize]=3`, { next: { revalidate: 60 } })
    const productsRelated = await resRelated.json()
    return (
        <>
            <ProductInfo product={product.data} />
            <RelatedItems productList={productsRelated.data} />
        </>
  );
};