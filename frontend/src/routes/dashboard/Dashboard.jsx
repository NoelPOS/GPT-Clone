import React from 'react'
import './Dashboard.css'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { userId } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = e.target.text.value
    const chatId = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, text }),
      credentials: 'include',
    }).then((res) => res.text())

    navigate(`/chat/${chatId}`)
  }
  return (
    <div className='dashboardPage'>
      <div className='texts'>
        <div className='logo'>
          <img src='/logo.png' alt='' />
          <h1>LAMA AI</h1>
        </div>
        <div className='options'>
          <div className='option'>
            <img src='/chat.png' alt='' />
            <span>Create a New Chat</span>
          </div>
          <div className='option'>
            <img src='/image.png' alt='' />
            <span>Analyze Images</span>
          </div>
          <div className='option'>
            <img src='/code.png' alt='' />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <input type='text' name='text' placeholder='Ask me anything...' />
          <button>
            <img src='/arrow.png' alt='' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard
