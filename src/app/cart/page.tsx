import React from 'react'
import { CartPageStoreContextProvider } from '@/context/CartPageStoreProvider'
import CartPageContent from './content'

type CartPageQuery = {
  page?: string
}

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<CartPageQuery>
}) {
  const params = await searchParams
  
  return (
    <CartPageStoreContextProvider 
      key={JSON.stringify(params)}
      initialPage={params.page ? parseInt(params.page) : 1}
    >
      <CartPageContent />
    </CartPageStoreContextProvider>
  )
}
