import React, { useEffect } from 'react'
import './DashboardLayout.css'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/signin')
    }
  }, [isLoaded, userId, navigate])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className='dashboardlayout'>
      <div className='right'>Menu</div>
      <div className='left'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
