"use client";

import NavbarPageRightButton from "@components/Navbar/NavbarPageRightButton";
import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/hooks/useRootStore";

const NavbarCartLink = observer(() => {
  const rootStore = useRootStore();
  return (
    <NavbarPageRightButton
      href="/cart"
      count={rootStore.cartStore.count}
      image="/bag-2.svg"
    ></NavbarPageRightButton>
  );
});

export default NavbarCartLink;
