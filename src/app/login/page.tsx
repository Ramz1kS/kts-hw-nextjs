'use client'

import React, { useState } from 'react'
import classes from './Login.module.scss'
import Button from '@/components/Button'
import Input from '@/components/Input'

const LoginPage = () => {
  const [loginVal, setLoginVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  return (
    <>
    <div>
      <Input value={loginVal} onChange={setLoginVal} placeholder='login'></Input>
      <Input value={passwordVal} onChange={setPasswordVal} placeholder='password'></Input>
    </div>
    <Button oneLined>Sign in</Button>
    </>
  )
}

export default LoginPage
