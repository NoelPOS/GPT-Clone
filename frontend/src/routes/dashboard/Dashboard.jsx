import React from 'react'
import './Dashboard.css'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import model from '../../lib/gemini'

const Dashboard = () => {
  const { userId } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = e.target.text.value

    const ans = await model.generateContent(text)
    const result = await ans.response.text()

    const chatId = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, text, result }),
    }).then((res) => res.text())

    navigate(`/dashboard/chat/${chatId}`)
  }

  return (
    <div className='dashboardPage'>
      <div className='texts'>
        <div className='logo'>
          <img src='/logo.png' alt='GPT Clone Logo' />
          <h1>GPT Clone</h1>
        </div>
        <div className='options'>
          <div className='option'>
            <img src='/chat.png' alt='Create Chat' />
            <span>Create a New Chat</span>
          </div>
          <div className='option'>
            <img src='/image.png' alt='Analyze Images' />
            <span>Analyze Images</span>
          </div>
          <div className='option'>
            <img src='/code.png' alt='Code Help' />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <input type='text' name='text' placeholder='Ask me anything...' />
          <button type='submit'>
            <img src='/arrow.png' alt='Submit' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard
