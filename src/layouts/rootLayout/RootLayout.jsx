import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './RootLayout.css'
import alien from '/alien.png?url'

const RootLayout = () => {
  return (
    <div className='rootlayout'>
      <header>
        <Link to='/'>
          <img src={alien} alt='Logo' className='logo' />
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
