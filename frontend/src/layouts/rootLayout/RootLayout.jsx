import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './RootLayout.css'
import alien from '/alien.png?url'
import {
  ClerkProvider,
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
} from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <div className='rootlayout'>
        <header>
          <Link to='/'>
            <img src={alien} alt='Logo' className='logo' />
          </Link>
          <div className='user'>
            {/* <SignedOut>
              <SignInButton />
            </SignedOut> */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  )
}

export default RootLayout
