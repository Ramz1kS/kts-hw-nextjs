"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import Text from "@/components/Text";
import { useCategoriesPageStore } from "@/hooks/useCategoriesPageStore";
import classes from "./Categories.module.scss";
import Link from "next/link";
import PageDescription from "@/components/PageDescription";
import { motion } from "framer-motion";
import animConfig from "@/config/animConfig";

const CategoriesContent = observer(() => {
  const pageStore = useCategoriesPageStore();

  return (
    <div className={classes.categoriesPage}>
      <PageDescription name="Categories"
      description="Select a category to see the list of products of that category"></PageDescription>
      <div className={classes.categoriesPage__list}>
        {pageStore.categories.map((category) => (
          <motion.div 
          key={category.id}
          whileHover={animConfig.generalWhileHover} 
          whileTap={animConfig.generalWhileTap}>
            <Link
            href={`/products?categories=${category.id}`}
            >
              <Text view="p-22" color="accent" weight="medium">
                {category.title}
              </Text>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default CategoriesContent;
