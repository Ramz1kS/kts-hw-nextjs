"use client";
import React, { useState } from "react";
import Text from "@components/Text";
import Button from "@components/Button";
import classes from "./ProductInfo.module.scss";
import ProductRating from "@components/ProductRating";
import Image from "next/image";
import * as motion from "motion/react-client";
import AddToCartButton from "./AddToCartButton";
import ArrowLeftIcon from "@components/icons/ArrowLeftIcon";
import { useProductPageStore } from "@/hooks/useProductPageStore";

function ProductInfo() {
  const product = useProductPageStore().data;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = product.images.length > 1;
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  };

  return (
    <div className={classes["product-info"]}>
      <motion.div
        className={classes["product-info__image-wrapper"]}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          className={classes["product-info__image"]}
          fill
          src={
            product.images.length == 0
              ? ""
              : product.images[currentImageIndex].formats.large.url
          }
          loading="eager"
          alt={product.title}
        />
        {hasMultipleImages && (
          <>
            <div className={classes["product-info__image-counter"]}>
              {currentImageIndex + 1} / {product.images.length}
            </div>
            <button
              className={classes["product-info__nav-btn-prev"]}
              onClick={prevImage}
            >
              <ArrowLeftIcon width={32} height={32} color="primary" />
            </button>
            <button
              className={classes["product-info__nav-btn-next"]}
              onClick={nextImage}
            >
              <ArrowLeftIcon width={32} height={32} color="primary" />
            </button>
          </>
        )}
      </motion.div>
      <motion.div
        className={classes["product-info__content"]}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className={classes["product-info__description"]}>
          <Text tag="h1" view="title" weight="bold">
            {product.title ?? "No title was provided"}
          </Text>

          {product.rating !== undefined ? (
            <ProductRating
              rating={product.rating}
              size="medium"
              gap={3}
            ></ProductRating>
          ) : null}
          <Text color="secondary" view="p-20">
            {product.description ?? "No description was provided"}
          </Text>
        </div>
        <div className={classes["product-info__actions"]}>
          <div className={classes["product-info__price"]}>
            <Text
              view="title"
              weight="bold"
              color={
                product.discountPercent !== undefined ? "accent" : "primary"
              }
              className={classes["product-info__price-current"]}
            >
              {product.price !== undefined
                ? `$${product.price}`
                : "No price found!"}
            </Text>
            <Text
              view="p-22"
              weight="bold"
              color="secondary"
              className={classes["product-info__price-old"]}
            >
              {product.discountPercent !== 0
                ? `$${Math.round((product.price! / (100 - product.discountPercent)) * 100)}`
                : null}
            </Text>
          </div>
          <div className={classes["product-info__buttons"]}>
            <Button disabled={!product.isInStock} oneLined={true}>
              {product.isInStock ? "Buy now" : "Not in stock"}
            </Button>
            <AddToCartButton id={product.id}></AddToCartButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductInfo;
