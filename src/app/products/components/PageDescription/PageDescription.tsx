import React from 'react';
import classes from './PageDescription.module.scss';
import Text from '@components/Text';

interface PageDescriptionProps {
  name: string;
  description: string;
}

const PageDescription: React.FC<PageDescriptionProps> = ({ name, description }) => {
  return (
    <div className={classes.textContainer}>
      <h1 className={classes.bigName}>{name}</h1>
      <Text className={classes.description} color="secondary" view="p-20">
        {description}
      </Text>
    </div>
  );
};

export default PageDescription;
