"use client";

import React from "react";
import classes from "./Input.module.scss";
import classNames from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  placeholder?: string;
  password?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      afterSlot,
      className,
      placeholder = "Text",
      password = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        <input
          ref={ref}
          value={value}
          type={password ? "password" : "text"}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={classNames(classes.myInput, className)}
          {...rest}
        />
        {afterSlot && (
          <div className={classes.afterSlotWrapper}>{afterSlot}</div>
        )}
      </>
    );
  },
);

Input.displayName = "Input";

export default Input;
