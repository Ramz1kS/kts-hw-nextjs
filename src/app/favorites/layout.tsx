import * as motion from 'motion/react-client'
import Text from '@/components/Text'
import classes from './Favorites.module.scss'
import React from 'react'

const CartLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <motion.div
      className={classes.favPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Text tag="h1" view="title" weight="bold">
        Favorites List
      </Text>
      {children}
    </motion.div>
  )
}

export default CartLayout
