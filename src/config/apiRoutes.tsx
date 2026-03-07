import { ProductListQuery } from "@/shared/types"

const apiPaths = {
  products: `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/products?populate[0]=images&populate[1]=productCategory`,
  getProductsURL: (params: ProductListQuery) => {
    let baseUrl = `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/products?populate[0]=images&populate[1]=productCategory&pagination[pageSize]=9`
    let paramString = ''
    paramString += params.page ? `&pagination[page]=${params.page}` : '&pagination[page]=1'
    paramString += params.inStockOnly == 'true' ? 
      '&filters[isInStock][$eq]=true' : '' 
    paramString += params.searchQuery ? `&filters[title][$containsi]=${params.searchQuery}` : ''
    paramString += params.categories ? 
        params.categories.split(',').map((id, i) => `&filters[productCategory][id][$in][${i}]=${id}`).join('') : ''
    paramString += params.sortBy && params.sortBy != 'none' ? `&sort=${params.sortBy}` : ''
    paramString += params.sortBy && params.sortBy != 'none' && params.sortHow ? 
        `:${params.sortHow}` : ''
    return baseUrl + paramString
  },
  getProductURL: (documentId: string) =>
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/products/${documentId}?populate[0]=images&populate[1]=productCategory`,
  getProductsByIds: (ids: number[]) => {
  const params = ids
    .map((id, i) => `filters[id][$in][${i}]=${id}`)
    .join('&')

  return `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/products?populate[0]=images&populate[1]=productCategory&${params}&pagination[pageSize]=${ids.length}`
},
  categories: `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/product-categories`,
};

export default apiPaths;
