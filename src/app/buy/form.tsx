'use client'

import React from 'react'
import classes from './Form.module.scss'
import Input from '@/components/Input'
import Text from '@/components/Text'
import { observer } from 'mobx-react-lite'
import { useBuyPageStore } from '@/hooks/useBuyPageStore'
import Button from '@/components/Button'

const BuyForm = observer(() => {
  const buyPageStore = useBuyPageStore()

  if (!buyPageStore.showForm) {
    return null
  }

  return (
    <div className={classes.buyForm}>
      <Text tag="h1" view="title" weight="normal" color='secondary'>Delivery info</Text>
      <div className={classes.buyForm__wrapper}>
        <Input placeholder='First and last name' required value={buyPageStore.name} onChange={buyPageStore.setName}></Input>
        <Input placeholder='Phone number' required value={buyPageStore.phone} onChange={buyPageStore.setPhone}></Input>
        <Input placeholder='Email' required value={buyPageStore.email} onChange={buyPageStore.setEmail}></Input>
        <Input placeholder='Country' required value={buyPageStore.country} onChange={buyPageStore.setCountry}></Input>
        <Input placeholder='City' required value={buyPageStore.city} onChange={buyPageStore.setCity}></Input>
        <Input placeholder='Street' required value={buyPageStore.street} onChange={buyPageStore.setStreet}></Input>
      </div>
      <Text tag="h1" view="title" weight="normal" color='secondary'>Card info</Text>
      <div className={classes.buyForm__cardWrapper}>
        <div className={classes.card}>
          <div className={classes.card__chip}></div>
          <div className={classes.card__inputWrapper}>
            <Input required placeholder='Card number' value={buyPageStore.cardNumber} onChange={buyPageStore.setCardNumber}></Input>
            <div className={classes.card__inputWrapperDateName}>
              <Input required placeholder='Card holder name' value={buyPageStore.cardHolder} onChange={buyPageStore.setCardHolder}></Input>
              <div className={classes.card__inputDate}>
                <Input required placeholder='MM/YY' value={buyPageStore.validThru} onChange={buyPageStore.setValidThru}></Input>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.cardBack}>
          <div className={classes.cardBack__stripe}></div>
          <div className={classes.cardBack__ccvWrapper}>
            <Text view="p-14" color='secondary'>CCV</Text>
            <Input required placeholder='123' value={buyPageStore.ccv} onChange={buyPageStore.setCcv} className={classes.cardBack__ccvInput}></Input>
          </div>
        </div>
      </div>
      <Button oneLined onClick={() => alert('Order placed!')} disabled={!buyPageStore.isFormValid}>Confirm order</Button>
    </div>
  )
})

export default BuyForm
