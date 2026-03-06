'use client'

import Button from '@/components/Button'
import React from 'react'
import classes from './AddToCartButton.module.scss'
import { useRootStore } from '@/hooks/useRootStore'

type AddToCartButtonProps = {
    id: number;
}

const AddToCartButton = ({id}: AddToCartButtonProps) => {
  const rootStore = useRootStore()
  return (
    <Button
        oneLined
        className={classes['product-info__button_cart']}
        onClick={() => rootStore.cartStore.addProductId(id)}
    >
        Add to cart
    </Button>
  )
}

export default AddToCartButton
