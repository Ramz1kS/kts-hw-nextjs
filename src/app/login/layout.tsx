import React from "react";
import classes from './Login.module.scss'
import * as motion from 'motion/react-client'
import Image from "next/image";


const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <motion.div
      className={classes.loginPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image width={130} height={42} alt='Lalasia' src='/logo.svg' />
      {children}
    </motion.div>
  )
}

export default LoginLayout
