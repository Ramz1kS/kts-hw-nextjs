"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CardList from "@/components/CardList";
import Text from "@/components/Text";
import { useRootStore } from "@/hooks/useRootStore";
import Paginator from "@/components/Paginator";
import { usePathname, useRouter } from "next/navigation";
import { useCartPageStore } from "@/hooks/useCartPageStore";
import Loader from "@/components/Loader";
import { redirect } from "next/navigation";
import { buyURL, errorLink } from "@/config/navConfig";
import Link from "next/link";
import classes from "./Cart.module.scss";
import Button from "@/components/Button";

const CartPageContent = observer(() => {
  const pageStore = useCartPageStore();
  const { cartStore } = useRootStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    pageStore.loadProducts(cartStore.productIds);
  }, [cartStore.isHydrated]);

  useEffect(() => {
    if (pageStore.maxPage > 0 && pageStore.currPage > pageStore.maxPage) {
      setCurrPage(pageStore.maxPage);
    } else if (pageStore.currPage < 1) {
      setCurrPage(1);
    }
  }, [pageStore.maxPage, pageStore.currPage]);

  const setCurrPage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (pageStore.loadingInfo.isLoading) {
    return <Loader size="l" />;
  }

  if (pageStore.loadingInfo.isError) {
    redirect(errorLink(pageStore.loadingInfo.errorCode));
  }

  if (cartStore.count === 0) {
    return <Text>Your cart is empty</Text>;
  }

  return (
    <>
      <div className={classes.total}>
        <Text view="title" tag="h2" weight="medium">
          Total: ${pageStore.price}
        </Text>
        <Link href={buyURL()}>
          <Button oneLined>Checkout</Button>
        </Link>
      </div>
      <CardList
        products={pageStore.paginatedProducts}
        buttonText="Remove"
        onButtonClick={(product) => {
          cartStore.removeProductId(product.id);
          pageStore.removeProductId(product.id);
        }}
      />
      {pageStore.maxPage > 1 && (
        <Paginator
          current={pageStore.currPage}
          total={pageStore.maxPage}
          setCurrent={setCurrPage}
        />
      )}
    </>
  );
});

export default CartPageContent;
