import React, { useState } from 'react'
import './Dashboard.css'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import model from '../../lib/gemini'

const Dashboard = () => {
  const { userId } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const text = e.target.text.value

      // Generate content using model
      const ans = await model.generateContent(text)
      const result = await ans.response.text()

      // Make API call to save chat
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chats`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            text,
            result,
          }),
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `HTTP error! status: ${response.status}`)
      }

      const chatId = await response.text()
      navigate(`/dashboard/chat/${chatId}`)
    } catch (error) {
      console.error('Error:', error)
      setError(
        error.message || 'Failed to process your request. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='dashboardPage'>
      <div className='texts'>
        <div className='logo'>
          <img src='/logo.png' alt='Logo' />
          <h1>GPT Clone</h1>
        </div>
        <div className='options'>
          <div className='option'>
            <img src='/chat.png' alt='Chat icon' />
            <span>Create a New Chat</span>
          </div>
          <div className='option'>
            <img src='/image.png' alt='Image icon' />
            <span>Analyze Images</span>
          </div>
          <div className='option'>
            <img src='/code.png' alt='Code icon' />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Ask me anything...'
            disabled={isLoading}
          />
          <button type='submit' disabled={isLoading}>
            <img src='/arrow.png' alt='Submit' />
          </button>
        </form>
        {error && <div className='error-message'>{error}</div>}
        {isLoading && (
          <div className='loading-message'>Processing your request...</div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
