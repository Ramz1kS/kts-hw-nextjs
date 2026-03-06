import React from 'react';
import Icon, { type IconProps } from '../Icon';
import classes from './ArrowLeftIcon.module.scss';

const ArrowLeftIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  className,
  color,
  ...props
}) => {
  return (
    <Icon width={width} height={height} className={className} {...props}>
      <path
        d="M15.09 19.92L8.56997 13.4C7.79997 12.63 7.79997 11.37 8.56997 10.6L15.09 4.07999"
        className={color == undefined ? classes.inherit : classes[color]}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowLeftIcon;
