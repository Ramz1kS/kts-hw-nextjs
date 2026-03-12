import React from "react";
import Text from "@components/Text";
import Button from "@components/Button";
import Link from "next/link";
import classes from "./success.module.scss";

export const SuccessLayout = () => {
  return (
    <div className={classes.successPage}>
      <Text
        tag="h1"
        view="title"
        weight="bold"
        color="accent"
        className={classes.code}
      >
        Order successfully registered
      </Text>
      <Text view="p-20" color="secondary">
        {`All order info is sent to your email. Congratulations!`}
      </Text>
      <Link href="/" className={classes.goHome}>
        <Button oneLined>Search more</Button>
      </Link>
    </div>
  );
};

export default SuccessLayout;
