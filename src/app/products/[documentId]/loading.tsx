import React from 'react'
import Loader from '@components/Loader'
import classes from './ProductPage.module.scss'
import Text from '@/components/Text'
import * as motion from 'motion/react-client'

const LoadingProduct = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Text view='title' color='accent' weight='medium'>Loading... Please wait</Text>
      </div>
    </>
  )
}

export default LoadingProduct
