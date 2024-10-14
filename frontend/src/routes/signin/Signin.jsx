import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import './Signin.css'

const Signin = () => {
  return (
    <div className='signinpage'>
      <SignIn path='/signin' signUpUrl='/login' forceRedirectUrl='/dashboard' />
    </div>
  )
}

export default Signin
