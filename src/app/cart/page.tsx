'use client'

import CardList from '@/components/CardList'
import Text from '@/components/Text'
import React, { useEffect } from 'react'
import { useRootStore } from '@/hooks/useRootStore'
import { observer } from 'mobx-react-lite'
import Loader from '@/components/Loader'

const CartPage = observer(() => {
  const { cartStore } = useRootStore()

  useEffect(() => {
    cartStore.loadProducts()
  }, [cartStore.isHydrated])

  if (cartStore.isLoading) {
    return <Loader size="l" />
  }

  if (cartStore.count === 0) {
    return <Text>Your cart is empty</Text>
  }

  return (
    <>
      <Text view='title' tag='h1' weight='medium'>Total: ${cartStore.price}</Text>
      <CardList
        products={cartStore.products}
        buttonText="Remove"
        onButtonClick={(product) => cartStore.removeProductId(product.id)}
      />
    </>
  )
})

export default CartPage