"use client";

import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import { useRouter } from "next/navigation";
import Text from "@/components/Text";
import classes from "./BackButton.module.scss";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={classes["product-page__back-link"]}
    >
      <ArrowLeftIcon width={32} height={32} color="primary" />
      <Text view="p-20" weight="normal">
        Back
      </Text>
    </div>
  );
};

export default BackButton;
