"use client";

import React from "react";
import classes from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import NavbarPageMiddleButton from "@components/Navbar/NavbarPageMiddleButton";
import { navItemsCenter, navLalasiaLink } from "@config/navConfig";
import NavbarCartLink from "@components/Navbar/NavbarCartLink";
import { usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";
import NavbarFavoritesLink from "./NavbarFavoritesLink";
import { useRootStore } from "@/hooks/useRootStore";

const Navbar = observer(() => {
  const path = usePathname().split("/");
  const { navbarStore } = useRootStore()
  return (
    <nav className={classes.navbar}>
      <Link href={navLalasiaLink}>
        <Image
          src={"/logo.svg"}
          width={130}
          height={42}
          alt="Lalasia"
          className={classes.navbar__logo}
        ></Image>
      </Link>
      <button className={classes.navbar__burger}  onClick={navbarStore.toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`${classes.navbar__buttons} ${navbarStore.isMenuOpen ? classes.navbar__buttons_open : ''}`}>
        {navItemsCenter.map((item) => (
          <NavbarPageMiddleButton
            key={item.name}
            name={item.name}
            path={item.href}
            currPath={path.length > 0 ? path[1] : ""}
          />
        ))}
      </div>
      <div className={classes["navbar__buttons-right"]}>
        <NavbarCartLink></NavbarCartLink>
        <NavbarFavoritesLink></NavbarFavoritesLink>
      </div>
    </nav>
  );
});

export default Navbar;
