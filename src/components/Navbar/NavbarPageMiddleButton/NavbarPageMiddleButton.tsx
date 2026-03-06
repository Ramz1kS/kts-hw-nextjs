import React from 'react';
import classes from './NavbarPageMiddleButton.module.scss';
import Text from '@components/Text/';
import classNames from 'classnames';
import type { pageName } from '@shared/types';
import Link from 'next/link'

type NavbarPageMiddleButtonProps = {
  name: pageName;
  path: string;
  selected: pageName;
  setSelected: (val: pageName) => void;
  onClick?: () => void;
};

const NavbarPageMiddleButton: React.FC<NavbarPageMiddleButtonProps> = ({
  name,
  path,
  selected,
  setSelected,
  onClick,
}) => {
  const finalClassName = classNames({
    [classes.navbarPageButton]: true,
    [classes['navbarPageButton-selected']]: selected == name,
  });
  return (
    <Link
      href={path}
      className={finalClassName}
      onClick={() => {
        setSelected(name);
        onClick?.();
      }}
    >
      <Text weight={selected == name ? 'bold' : 'normal'} view="p-18">
        {name}
      </Text>
    </Link>
  );
};

export default NavbarPageMiddleButton;
