import { SignUp } from '@clerk/clerk-react'
import React from 'react'
import './Signin.css'

const Signin = () => {
  return (
    <div className='signinpage'>
      <SignUp path='/signup' signInUrl='/login' />
    </div>
  )
}

export default Signin
