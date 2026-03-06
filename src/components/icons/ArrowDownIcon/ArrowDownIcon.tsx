import * as React from 'react';
import Icon, { type IconProps } from '../Icon';
import classes from './ArrowDownIcon.module.scss';

const ArrowDownIcon: React.FC<IconProps> = ({ width = 24, height = 24, color, ...props }) => {
  return (
    <Icon width={width} height={height} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        className={color == undefined ? classes.inherit : classes[color]}
        strokeWidth="2"
      />
    </Icon>
  );
};

export default ArrowDownIcon;
