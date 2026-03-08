'use client'

import React, { useMemo } from 'react';
import classes from './ProductRating.module.scss';

interface ProductRatingProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
  gap?: number;
}

const MAX_RATING = 5

const ProductRating: React.FC<ProductRatingProps> = ({ rating, size = 'small', gap = 4 }) => {
  const calcSize = () => {
    if (size == 'small') return { width: 12, height: 12 }
    else if (size == 'medium') return { width: 18, height: 18 }
    else return { width: 24, height: 24 }
  }
  const validateRating = () => {
    if (rating < 0) return 0
    if (rating > MAX_RATING) return MAX_RATING
    return rating
  }
  const memoRating = useMemo(() => (<div
      className={classes['product-rating']}
      style={{
        gap: gap,
      }}
    >
      {Array(validateRating())
        .fill(0)
        .map((_, i) => (
          <div
            key={`filled-${i}`}
            className={`${classes['product-rating__circle']} ${classes['product-rating__circle_filled']}`}
            style={calcSize()}
          ></div>
        ))}
      {Array(MAX_RATING - validateRating())
        .fill(0)
        .map((_, i) => (
          <div
            key={`empty-${i}`}
            className={`${classes['product-rating__circle']} ${classes['product-rating__circle_empty']}`}
            style={calcSize()}
          ></div>
        ))}
    </div>), [])
  return (
    <div
      className={classes['product-rating']}
      style={{
        gap: gap,
      }}
    >
        {memoRating}
    </div>
  );
};

export default ProductRating;
