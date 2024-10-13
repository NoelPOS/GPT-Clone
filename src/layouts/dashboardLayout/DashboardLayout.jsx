import React, { useEffect } from 'react'
import './DashboardLayout.css'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import ChatList from '../../components/chatlist/ChatList'
import Chat from '../../routes/chat/Chat'

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
      <div className='menu'>
        <ChatList />
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
