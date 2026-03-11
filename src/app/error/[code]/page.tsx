"use client";

import React from "react";
import Link from "next/link";
import Text from "@components/Text";
import Button from "@components/Button";
import classes from "./ErrorPage.module.scss";
import { useParams } from "next/navigation";

export const metadata = {
  title: 'Error!',
  description: 'Could not find what you\'re looking for :('
}

export const ErrorPage = () => {
  const { code } = useParams();

  return (
    <div className={classes.errorPage}>
      <Text
        tag="h1"
        view="title"
        weight="bold"
        color="accent"
        className={classes.code}
      >
        {code ?? 404}
      </Text>
      <Text view="p-20" color="secondary">
        Something went wrong. Please try again later.
      </Text>
      <Link href="/" className={classes.goHome}>
        <Button oneLined>Go to Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
