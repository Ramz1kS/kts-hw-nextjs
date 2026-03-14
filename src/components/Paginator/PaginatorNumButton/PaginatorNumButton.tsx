"use client";

import React from "react";
import classes from "./PaginatorNumButton.module.scss";
import Text from "@components/Text";
import classNames from "classnames";

interface PaginatorNumButtonProps {
  num: number;
  currNum: number;
  setCurrent: (val: number) => void;
}

const PaginatorNumButton: React.FC<PaginatorNumButtonProps> = ({
  currNum,
  num,
  setCurrent,
}) => {
  const finalClassName = classNames({
    [classes["paginatorButtonActive"]]: num == currNum,
    [classes["paginatorButton"]]: num != currNum,
  });
  return (
    <button
      className={finalClassName}
      onClick={() => {
        setCurrent(num);
      }}
    >
      <Text view="p-18">{num}</Text>
    </button>
  );
};

export default PaginatorNumButton;
