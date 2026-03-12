"use client";

import { useBuyPageStore } from "@/hooks/useBuyPageStore";
import { useRootStore } from "@/hooks/useRootStore";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import classes from "./Buy.module.scss";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { redirect, useSearchParams } from "next/navigation";
import { errorLink, productsURL } from "@/config/navConfig";
import Link from "next/link";
import Input from "@/components/Input";

const BuyPageContent = observer(() => {
  const searchParams = useSearchParams()
  const buyPageStore = useBuyPageStore();
  const { cartStore } = useRootStore();
  const [promoInput, setPromoInput] = useState("")

  useEffect(() => {
    const productId = searchParams.get("productId");  
    buyPageStore.loadProducts(
      productId !== null && !Number.isNaN(parseInt(productId, 10)) && parseInt(productId, 10) >= 0 
      ? new Map<number, number>([[parseInt(productId, 10), 1]]) : cartStore.productIds
    );
  }, [cartStore.isHydrated]);

  if (buyPageStore.loadingInfo.isLoading) {
    return <Loader size="l" />;
  }

  if (buyPageStore.loadingInfo.isError) {
    redirect(errorLink(buyPageStore.loadingInfo.errorCode));
  }

  if (buyPageStore.products.size === 0) {
    return (<>
      <Text view="p-20">Nothing to buy here!</Text>
      <Link href={productsURL}>
        <Button oneLined>Look for products</Button>
      </Link>
    </>);
  }

  return (
    <div className={classes.content}>
      <div className={classes.productsList}>
        {Array.from(buyPageStore.products.entries()).map(([id, product]) => (
          <div key={id} className={classes.productItem}>
            <Text view="p-18" weight="medium">
              {product.name}
            </Text>
            <div className={classes.productItem__costCalc}>
              <Text view="p-16">
                {product.price} $ * {product.count}
              </Text>
              <div className={classes.productItem__cost}>
                <Text view="p-18" weight="bold" color="accent">
                  {product.price * product.count * (100 - buyPageStore.discount) / 100} $
                </Text>
                {buyPageStore.discount !== 0 ? 
                <Text view="p-18" weight="medium" color="secondary" className={classes.costBefore}>
                  {product.price * product.count} $
                </Text> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className={classes.promoInput}>
          <Input 
          value={promoInput}
          placeholder="Input promocode here, if you have one"
          onChange={setPromoInput}></Input>
          <Button oneLined onClick={
            () => buyPageStore.applyPromocode(promoInput)
          }>Apply</Button>
        </div>
        <div className={classes.total__wrapper}>
          <div className={classes.total}>
            <Text view="p-20" weight="bold">
            Result: 
            </Text>
            <Text view="p-20" weight="bold" color="accent">
              {buyPageStore.totalPriceWithDiscount} $
            </Text>
            <Text view="p-16" color="secondary" className={classes.costBefore}>
              {buyPageStore.discount !== 0 ? `${buyPageStore.totalPrice} $` : null}
            </Text>
          </div>
          <Button oneLined onClick={() => buyPageStore.setShowForm(true)}>Make order</Button>
        </div>
      </div>
    </div>
  );
});

export default BuyPageContent;
