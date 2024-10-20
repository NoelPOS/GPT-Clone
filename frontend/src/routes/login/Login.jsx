import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='signuppage'>
      <SignIn path='/login' signUpUrl='/signup' forceRedirectUrl='/' />
    </div>
  )
}

export default Login
