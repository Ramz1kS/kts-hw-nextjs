import React from "react";
import classes from "./NavbarPageRightButton.module.scss";
import Link from "next/link";
import Image from "next/image";

interface NavbarPageRightButtonProps {
  image: string;
  href?: string;
  count?: number;
}

export const NavbarPageRightButton: React.FC<NavbarPageRightButtonProps> = ({
  image,
  href,
  count = -1,
}) => {
  return (
    <Link className={classes.navbarPageRightLink} href={href ?? ""}>
      <Image
        src={image}
        width={32}
        height={32}
        alt={href ?? "some button"}
      ></Image>
      {count > 0 ? (
        <div className={classes.numberContainer}>
          {count < 10 ? count : "9+"}
        </div>
      ) : null}
    </Link>
  );
};

export default NavbarPageRightButton;
