import React from 'react'
import { FavoritesPageStoreContextProvider } from '@/context/FavoritesPageStoreProvider'
import FavoritesPageContent from './content'

type FavoritesPageQuery = {
  page?: string
}

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<FavoritesPageQuery>
}) {
  const params = await searchParams
  
  return (
    <FavoritesPageStoreContextProvider 
      key={JSON.stringify(params)}
      initialPage={params.page ? parseInt(params.page) : 1}
    >
      <FavoritesPageContent />
    </FavoritesPageStoreContextProvider>
  )
}
