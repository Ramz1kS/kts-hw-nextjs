'use client';

import React from 'react';
import classes from './Navbar.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import NavbarPageMiddleButton from '@components/Navbar/NavbarPageMiddleButton';
import NavbarPageRightButton from '@components/Navbar/NavbarPageRightButton';
import { navItemsCenter, navLalasiaLink } from '@config/navConfig';
import NavbarCartLink from '@components/Navbar/NavbarCartLink';
import { usePathname } from 'next/navigation'
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'next/navigation';
import NavbarFavoritesLink from './NavbarFavoritesLink';

const Navbar = observer(() => {
  const path = usePathname().split('/')
  return (
    <nav className={classes.navbar}>
      <Link href={navLalasiaLink}>
        <Image src={'/logo.svg'} width={130} height={42} alt='Lalasia' className={classes.navbar__logo}></Image>
      </Link>
      <button className={classes.navbar__burger}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
        className={`${classes.navbar__buttons}`}
      >
        {navItemsCenter.map((item) => (
          <NavbarPageMiddleButton
            key={item.name}
            name={item.name}
            path={item.href}
            currPath={path.length > 0 ? path[1] : ''}
          />
        ))}
      </div>
      <div className={classes['navbar__buttons-right']}>
        <NavbarCartLink></NavbarCartLink>
        <NavbarFavoritesLink></NavbarFavoritesLink>
      </div>
    </nav>
  );
});

export default Navbar;
