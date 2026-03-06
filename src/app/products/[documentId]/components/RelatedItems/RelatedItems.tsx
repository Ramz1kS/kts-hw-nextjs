'use client'

import React from 'react';
import Text from '@components/Text';
import CardList from '@components/CardList';
import classes from './RelatedItems.module.scss';
import { ProductData } from '@/shared/types';
import { useRootStore } from '@/hooks/useRootStore';

type RelatedItemsProps = {
    productList: ProductData[]
}

const RelatedItems = ({productList} : RelatedItemsProps) => {
  const rootStore = useRootStore()
  return (
    <>
      <Text tag="h2" className={classes['related-items__title']} weight="bold">
        Related items
      </Text>
      {productList.length == 0 ? (
        <Text>Related items list is empty</Text>
      ) : (
        <CardList
          buttonText="Add to cart"
          onButtonClick={(product) => rootStore.cartStore.addProductId(product.id)}
          products={productList}
        />
      )}
    </>
  );
};

export default RelatedItems;
