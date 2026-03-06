const apiPaths = {
  products: `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/products?populate[0]=images&populate[1]=productCategory`,
  getProductURL: (documentId: string) =>
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/products/${documentId}?populate[0]=images&populate[1]=productCategory`,
  getProductsByIds: (ids: number[]) =>
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/products?populate[0]=images&populate[1]=productCategory&filters[id][$in]=${ids.join(',')}&pagination[pageSize]=${ids.length}`,
  categories: `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/product-categories`,
};

export default apiPaths;
