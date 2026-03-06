import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  width = 24,
  height = 24,
  viewBoxWidth = 24,
  viewBoxHeight = 24,
  children,
  ...rest
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      {...rest}
    >
      {children}
    </svg>
  );
};

export default Icon;
