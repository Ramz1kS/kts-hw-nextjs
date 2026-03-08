"use client";

import React, { useMemo } from "react";
import classes from "./ProductRating.module.scss";

interface ProductRatingProps {
  rating: number;
  size?: "small" | "medium" | "large";
  gap?: number;
}

const MAX_RATING = 5;
const SIZE_MAP = {
  small: { width: 12, height: 12 },
  medium: { width: 18, height: 18 },
  large: { width: 24, height: 24 },
} as const;

const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  size = "small",
  gap = 4,
}) => {
  const validRating = useMemo(() => {
    if (rating < 0) return 0;
    if (rating > MAX_RATING) return MAX_RATING;
    return rating;
  }, [rating]);

  const circleSize = useMemo(() => SIZE_MAP[size], [size]);

  const circles = useMemo(() => {
    const filled = Array(validRating)
      .fill(0)
      .map((_, i) => (
        <div
          key={`filled-${i}`}
          className={`${classes["product-rating__circle"]} ${classes["product-rating__circle_filled"]}`}
          style={circleSize}
        />
      ));

    const empty = Array(MAX_RATING - validRating)
      .fill(0)
      .map((_, i) => (
        <div
          key={`empty-${i}`}
          className={`${classes["product-rating__circle"]} ${classes["product-rating__circle_empty"]}`}
          style={circleSize}
        />
      ));

    return [...filled, ...empty];
  }, [validRating, circleSize]);

  return (
    <div className={classes["product-rating"]} style={{ gap }}>
      {circles}
    </div>
  );
};

export default React.memo(ProductRating);
