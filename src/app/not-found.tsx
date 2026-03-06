'use client'

import React from 'react';
import Text from '@components/Text';
import Button from '@components/Button';
import Link from 'next/link';
import classes from './error.module.scss';

export const ErrorPage = () => {
  return (
    <div className={classes.errorPage}>
      <Text tag="h1" view="title" weight="bold" color="accent" className={classes.code}>
        404
      </Text>
      <Text view="p-20" color="secondary">
        Unfortunately, the contect you're looking for could not be found :{'('}
      </Text>
      <Link href="/" className={classes.goHome}>
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
