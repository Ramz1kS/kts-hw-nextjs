'use client';

import classNames from 'classnames';
import React, { useState } from 'react';
import classes from './Card.module.scss';
import Text from '@components/Text';
import * as motion from 'motion/react-client';
import ProductRating from '@components/ProductRating';
import Image from 'next/image'
import FavoriteButton from './FavoriteButton/FavoriteButton';

export type CardProps = {
  className?: string;
  image?: string;
  captionSlot?: React.ReactNode;
  title?: React.ReactNode;
  /** Описание карточки */
  subtitle?: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  rating?: number;
  discountPercent?: number;
  isInStock?: boolean;
  id: number;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  rating,
  isInStock,
  id
}) => {
  const finalClassName = classNames(classes.card, className, {
    [classes['card-notInStock']]: !isInStock
  });
  const onImageNotFound = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log('Image not found');
    e.currentTarget.src = '/no_img_found.png'
  };
  return (
    <motion.div
      className={finalClassName}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
        <FavoriteButton id={id}></FavoriteButton>
        <div className={classes['card__image-wrapper']}>
            <Image
            className={classes.card__image}
            onError={onImageNotFound}
            fill
            sizes=''
            src={image ?? '/no_img_found.png'}
            alt=""/>
        </div>
      <div className={classes['card__info-wrapper']}>
        <div className={classes.card__info}>
          {rating !== undefined ? <ProductRating rating={rating}></ProductRating> : null}
          {<p className={classes.card__caption}>{captionSlot}</p>}
          <Text
            tag="p"
            view="p-20"
            weight="medium"
            className={classes.card__title}
            maxLines={2}
            color="primary"
          >
            {title}
          </Text>
          <Text
            tag="p"
            view="p-16"
            className={classes.card__subtitle}
            maxLines={3}
            color="secondary"
          >
            {subtitle}
          </Text>
        </div>
        <div className={classes.card__footer}>
          <div className={classes.card__content}>{contentSlot}</div>
          {actionSlot}
        </div>
        {!isInStock ? <Text className={classes['card__not-in-stock']} view='p-20' weight='bold'>Not in stock</Text> : null}
      </div>
    </motion.div>
  );
};

export default Card;
