import * as React from 'react';
import classes from './Text.module.scss';
import classNames from 'classnames';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-22' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view = 'p-16',
  tag: Tag = 'p',
  weight = 'normal',
  children,
  color = 'inherit',
  maxLines,
}) => {
  const finalClassName = classNames(
    classes[view],
    classes[weight],
    {
      [classes[color]]: color,
    },
    className
  );
  const clampStyle = maxLines
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical' as const,
        WebkitLineClamp: maxLines,
        overflow: 'hidden',
      }
    : undefined;
  return (
    <Tag className={finalClassName} data-testid="text" style={clampStyle}>
      {children}
    </Tag>
  );
};

export default Text;
