'use client'

import React from 'react';
import classes from './PaginatorArrowButton.module.scss';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

interface PaginatorArrowButtonProps {
  currNum: number;
  setCurrent: (val: number) => void;
  total: number;
  type: 'forward' | 'backward';
}

const PaginatorArrowButton: React.FC<PaginatorArrowButtonProps> = ({
  currNum,
  setCurrent,
  total,
  type,
}) => {
  const finalClassName = classNames({
    [classes['forward']]: type == 'forward',
    [classes['disabled']]: type == 'forward' ? currNum == total : currNum == 1,
  });
  return (
    <button
      disabled={type == 'forward' ? currNum == total : currNum == 1}
      className={classes.arrowButton}
      onClick={() => {
        let bruh = currNum;
        if (type == 'backward') bruh--;
        else bruh++;
        if (bruh == 0) bruh = 1;
        else if (bruh > total) bruh = total;
        setCurrent(bruh);
      }}
    >
      <img className={finalClassName} src='/arrow-left.svg'></img>
    </button>
  );
};

export default PaginatorArrowButton;
