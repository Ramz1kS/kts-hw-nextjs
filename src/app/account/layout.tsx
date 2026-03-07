import React from 'react'
import classes from './AccountPage.module.scss'
import Text from '@/components/Text'
import * as motion from 'motion/react-client'

const AccountLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <motion.div
      className={classes.accountPage__layout}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Text tag="h1" view="title" weight="bold">
        Account
      </Text>
      {children}
    </motion.div>
  )
}

export default AccountLayout
