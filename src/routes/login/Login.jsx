import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const Login = () => {
  return (
    <div>
      <SignUp path='/signup' />
    </div>
  )
}

export default Login
