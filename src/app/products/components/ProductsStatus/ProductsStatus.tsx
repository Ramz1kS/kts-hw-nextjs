import React from 'react';
import Text from '@components/Text';
import classes from './ProductsStatus.module.scss';

type ProductsStatusProps = {
  total?: number;
};

const ProductsStatus: React.FC<ProductsStatusProps> = ({
  total,
}) => {
  return (
    <div className={classes.totalProdsDiv}>
        <Text className={classes.totalProducts} weight="bold">
            Total products
          </Text>
          <Text view="p-20" weight="bold" color="accent">
            {total}
          </Text>
    </div>
  );
};

export default ProductsStatus;
