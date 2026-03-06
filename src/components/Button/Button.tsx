'use client'

import React from 'react';
import classes from './Button.module.scss';
import classNames from 'classnames';
import Loader from '@components/Loader';
import { motion } from 'framer-motion';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  oneLined?: boolean
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled, oneLined = false, ...rest }) => {
  const btnClass = classNames(classes.myBtn, className, {
    [classes['myBtn--disabled']]: disabled,
    [classes['myBtn--onelined']]: oneLined,
  });
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={classes.myBtn__wrapper}
    >
      <button className={btnClass} disabled={loading || disabled} {...rest}>
        {loading && <Loader size="s" className={classes.myBtn__loader} />}
        <p className={classes.myBtn__text}>{children}</p>
      </button>
    </motion.div>
  );
};

export default Button;
