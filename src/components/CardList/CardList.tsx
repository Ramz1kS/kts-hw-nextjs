'use client'

import React, { useEffect, useState } from "react";
import classes from "./CardList.module.scss";
import Button from "@components/Button";
import Card from "@components/Card";
import type { ProductData } from "@shared/types";
import Link from "next/link";
import * as motion from "motion/react-client";
import Text from "@components/Text";
import { useRootStore } from "@/hooks/useRootStore";
import { observer } from "mobx-react-lite";

interface CardListInterface {
  products: ProductData[];
  buttonText: string;
  onButtonClick?: (val: ProductData) => void;
}

const CardList: React.FC<CardListInterface> = observer(({
  products,
  buttonText,
  onButtonClick,
}) => {
  const { cartStore } = useRootStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      {products.length == 0 ? (
        <Text tag="h2" view="button" color="accent">
          No products found.
        </Text>
      ) : (
        <ul className={classes["card-list"]}>
          {products.map((product, index) => (
            <motion.li
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/products/${product.documentId}`}
                className={classes["card-list__link"]}
              >
                <article className={classes["card-list__link-wrapper"]}>
                  <Card
                    image={
                      product.images.length != 0
                        ? product.images[0].formats.small.url
                        : undefined
                    }
                    id={product.id}
                    isInStock={product.isInStock}
                    isInCart={
                      mounted && cartStore.productIds.has(product.id)
                    }
                    cartCount={cartStore.productIds.get(product.id)}
                    captionSlot={product.productCategory.title}
                    title={product.title}
                    subtitle={product.description}
                    contentSlot={
                      <div className={classes["card-list__price"]}>
                        <Text
                          view="p-22"
                          weight="bold"
                          color={
                            product.discountPercent !== undefined
                              ? "accent"
                              : "primary"
                          }
                          className={classes["card-list__price_current"]}
                        >
                          {`$${product.price}`}
                        </Text>
                        <Text
                          view="p-14"
                          weight="bold"
                          color="secondary"
                          className={classes["card-list__price_old"]}
                        >
                          {product.discountPercent != 0
                            ? `$${Math.round((product.price / (100 - product.discountPercent)) * 100)}`
                            : null}
                        </Text>
                      </div>
                    }
                    rating={product.rating}
                    actionSlot={
                      <Button
                        oneLined
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          if (onButtonClick != undefined)
                            onButtonClick(product);
                        }}
                      >
                        {buttonText}
                      </Button>
                    }
                  />
                </article>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </>
  );
});

export default CardList;
