'use client';

import React from 'react';
import classes from './Navbar.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import NavbarPageMiddleButton from '@components/Navbar/NavbarPageMiddleButton';
import NavbarPageRightButton from '@components/Navbar/NavbarPageRightButton';
import { navItems } from '@config/navConfig';
import NavbarCartLink from '@components/Navbar/NavbarCartLink';
// import { navigationStore } from 'stores/NavigationStore/NavigationStore';
import { observer } from 'mobx-react-lite';

const Navbar = observer(() => {
  return (
    <nav className={classes.navbar}>
        {/* onClick={() => navigationStore.setCurrentPage('Products')} */}
      <Link href="/">
        <Image src={'/logo.svg'} width={130} height={42} alt='Lalasia' className={classes.navbar__logo}></Image>
      </Link>
       {/* onClick={navigationStore.toggleMenu} */}
      <button className={classes.navbar__burger}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
    //   ${navigationStore.isMenuOpen ? classes.navbar__buttons_open : ''}`
        className={`${classes.navbar__buttons}`}
      >
        {navItems.map((item) => (
          <NavbarPageMiddleButton
            key={item.name}
            name={item.name}
            path={item.href}
            selected='Products'
            setSelected={() => 'Products'}
            // selected={navigationStore.currentPage}
            // setSelected={navigationStore.setCurrentPage}
            // onClick={navigationStore.closeMenu}
          />
        ))}
      </div>
      <div className={classes['navbar__buttons-right']}>
        <NavbarCartLink></NavbarCartLink>
        <NavbarPageRightButton image='/user.svg'></NavbarPageRightButton>
      </div>
    </nav>
  );
});

export default Navbar;
