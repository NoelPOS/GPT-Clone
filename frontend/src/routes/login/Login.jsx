import { SignUp } from '@clerk/clerk-react'
import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='signuppage'>
      <SignUp path='/login' signInUrl='signin' />
    </div>
  )
}

export default Login
