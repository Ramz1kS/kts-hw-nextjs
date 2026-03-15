"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useProductListPageStore } from "@/hooks/useProductListPageStore";
import CardList from "@/components/CardList";
import PageDescription from "../../components/PageDescription/PageDescription";
import ProductsStatus from "./components/ProductsStatus/ProductsStatus";
import classes from "./Products.module.scss";
import { useRootStore } from "@hooks/useRootStore";
import SearchFilter from "./components/SearchFilter";
import Paginator from "@components/Paginator";
import { usePathname, useRouter } from "next/navigation";

const ProductsPageContent = observer(() => {
  const store = useProductListPageStore();
  const { cartStore } = useRootStore();
  const router = useRouter();
  const usePath = usePathname();
  const setCurrPage = (val: number) => {
    store.setPage(val);
    router.replace(`${usePath}?${store.getURLSearchParams()}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [store.currPage])
  return (
    <div className={classes["products-page"]}>
      <div className={classes.content}>
        <PageDescription
          name="Products"
          description="We display products based on the latest products we have, if you want to see our old products please enter the name item"
        />
        <SearchFilter></SearchFilter>
        <ProductsStatus total={store.total} />
        <CardList
          products={store.products}
          buttonText="Add to Cart"
          onButtonClick={(product) => cartStore.addProductId(product.id)}
        />
        <Paginator
          current={store.currPage}
          total={store.maxPage}
          setCurrent={setCurrPage}
        ></Paginator>
      </div>
    </div>
  );
});

export default ProductsPageContent;
