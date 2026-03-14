'use client'

import React from 'react'
import classes from './Form.module.scss'
import Input from '@/components/Input'
import Text from '@/components/Text'
import { observer } from 'mobx-react-lite'
import { useBuyPageStore } from '@/hooks/useBuyPageStore'
import Button from '@/components/Button'
import Link from 'next/link'
import { successUrl } from '@/config/navConfig'
import { useSearchParams } from 'next/navigation'
import { useRootStore } from '@/hooks/useRootStore'

const BuyForm = observer(() => {
  const buyPageStore = useBuyPageStore()
  const searchParams = useSearchParams()
  const { cartStore } = useRootStore()
  if (!buyPageStore.showForm) {
    return null
  }

  return (
    <div className={classes.buyForm}>
      <Text tag="h1" view="title" weight="normal" color='secondary'>Delivery info</Text>
      <div className={classes.buyForm__wrapper}>
        <Input placeholder='First and last name' required value={buyPageStore.formData.name} onChange={(v) => buyPageStore.setFormField('name', v)}></Input>
        <Input placeholder='Phone number' required value={buyPageStore.formData.phone} onChange={(v) => buyPageStore.setFormField('phone', v)}></Input>
        <Input placeholder='Email' required value={buyPageStore.formData.email} onChange={(v) => buyPageStore.setFormField('email', v)}></Input>
        <Input placeholder='Country' required value={buyPageStore.formData.country} onChange={(v) => buyPageStore.setFormField('country', v)}></Input>
        <Input placeholder='City' required value={buyPageStore.formData.city} onChange={(v) => buyPageStore.setFormField('city', v)}></Input>
        <Input placeholder='Street' required value={buyPageStore.formData.street} onChange={(v) => buyPageStore.setFormField('street', v)}></Input>
      </div>
      <Text tag="h1" view="title" weight="normal" color='secondary'>Card info</Text>
      <div className={classes.buyForm__cardWrapper}>
        <div className={classes.card}>
          <Text view='title' className={classes.card__title}>Your card</Text>
          <div className={classes.card__inputWrapper}>
            <Input required placeholder='Card number' value={buyPageStore.formData.cardNumber} onChange={(v) => buyPageStore.setFormField('cardNumber', v)}></Input>
            <div className={classes.card__inputWrapperDateName}>
              <Input required placeholder='Card holder name' value={buyPageStore.formData.cardHolder} onChange={(v) => buyPageStore.setFormField('cardHolder', v)}></Input>
              <div className={classes.card__inputDate}>
                <Input required placeholder='MM/YY' value={buyPageStore.formData.validThru} onChange={(v) => buyPageStore.setFormField('validThru', v)}></Input>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.cardBack}>
          <div className={classes.cardBack__stripe}></div>
          <div className={classes.cardBack__ccvWrapper}>
            <Text view="p-14" color='secondary'>CCV</Text>
            <Input required placeholder='123' value={buyPageStore.formData.ccv} onChange={(v) => buyPageStore.setFormField('ccv', v)} className={classes.cardBack__ccvInput}></Input>
          </div>
        </div>
      </div>
      <Link href={successUrl}>
        <Button oneLined onClick={() => {
          if (searchParams.get('productId') === null) {
            cartStore.clear()
          }
        }} disabled={!buyPageStore.isFormValid}>Confirm order</Button>
      </Link>
    </div>
  )
})

export default BuyForm
