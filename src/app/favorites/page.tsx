'use client'

import CardList from '@/components/CardList'
import Text from '@/components/Text'
import React, { useEffect } from 'react'
import { useRootStore } from '@/hooks/useRootStore'
import { observer } from 'mobx-react-lite'
import Loader from '@/components/Loader'

const FavoritesPage = observer(() => {
  const { favoritesStore, cartStore } = useRootStore()

  useEffect(() => {
    favoritesStore.loadProducts()
  }, [favoritesStore.isHydrated])

  if (favoritesStore.isLoading) {
    return <Loader size="l" />
  }

  if (favoritesStore.count === 0) {
    return <Text>You have no favorite products</Text>
  }

  return (
    <>
      <Text view='title' tag='h1' weight='medium'>Count: {favoritesStore.count}</Text>
      <CardList
        products={favoritesStore.products}
        buttonText="Add to Cart"
        onButtonClick={(product) => cartStore.addProductId(product.id)}
      />
    </>
  )
})

export default FavoritesPage