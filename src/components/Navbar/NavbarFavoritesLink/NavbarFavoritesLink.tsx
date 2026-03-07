'use client';

import NavbarPageRightButton from '@components/Navbar/NavbarPageRightButton';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/hooks/useRootStore';

const NavbarFavoritesLink = observer(() => {
  const rootStore = useRootStore()
  return (
    <NavbarPageRightButton
      href="/favorites"
      count={rootStore.favoritesStore.count}
      image='/heart_icon.svg'
    ></NavbarPageRightButton>
  );
});

export default NavbarFavoritesLink;
