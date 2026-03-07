import React from 'react';
import classes from './NavbarPageMiddleButton.module.scss';
import Text from '@components/Text/';
import classNames from 'classnames';
import type { pageName } from '@shared/types';
import Link from 'next/link'

type NavbarPageMiddleButtonProps = {
  name: pageName;
  path: string;
  currPath: string
};

const NavbarPageMiddleButton: React.FC<NavbarPageMiddleButtonProps> = ({
  name,
  path,
  currPath
}) => {
  const finalClassName = classNames({
    [classes.navbarPageButton]: true,
    [classes['navbarPageButton-selected']]: currPath == path,
  });
  return (
    <Link
      href={`/${path}`}
      className={finalClassName}
    >
      <Text weight={currPath == path ? 'bold' : 'normal'} view="p-18">
        {name}
      </Text>
    </Link>
  );
};

export default NavbarPageMiddleButton;
