"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CardList from "@/components/CardList";
import Text from "@/components/Text";
import { useRootStore } from "@/hooks/useRootStore";
import Paginator from "@/components/Paginator";
import { usePathname, useRouter } from "next/navigation";
import { useFavoritesPageStore } from "@/hooks/useFavoritesPageStore";
import Loader from "@/components/Loader";
import { redirect } from "next/navigation";
import { errorLink } from "@/config/navConfig";

const FavoritesPageContent = observer(() => {
  const pageStore = useFavoritesPageStore();
  const { favoritesStore, cartStore } = useRootStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    pageStore.loadProducts(favoritesStore.productIds);
  }, [favoritesStore.productIds]);

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

  if (favoritesStore.count === 0) {
    return <Text>You have no favorite products</Text>;
  }

  return (
    <>
      <Text view="title" tag="h2" weight="medium">
        Count: {favoritesStore.count}
      </Text>
      <CardList
        products={pageStore.products}
        buttonText="Add to Cart"
        onButtonClick={(product) => cartStore.addProductId(product.id)}
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

export default FavoritesPageContent;
