"use client";

import React from "react";
import Image from "next/image";
import classes from "./FavoriteButton.module.scss";
import { useRootStore } from "@/hooks/useRootStore";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import animConfig from "@/config/animConfig";
import { useFavoritesPageStore } from "@/hooks/useFavoritesPageStore";

type FavoriteButtonProps = {
  id: number;
};

const FavoriteButton = observer(({ id }: FavoriteButtonProps) => {
  const { favoritesStore } = useRootStore();
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesStore.toggleProduct(id);
  };
  return (
    <motion.button
      onClick={onClick}
      whileHover={animConfig.generalWhileHover}
      whileTap={animConfig.generalWhileTap}
      className={classes.favoritesAdd}
    >
      <Image
        width={45}
        height={45}
        src={
          favoritesStore.productIds.has(id)
            ? "./heart_liked.svg"
            : "./heart.svg"
        }
        alt="favorites_add"
      />
    </motion.button>
  );
});

export default FavoriteButton;
