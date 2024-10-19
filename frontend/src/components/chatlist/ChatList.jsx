import React from 'react'
import { useState, useEffect } from 'react'
import './ChatList.css'
import { Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

const ChatList = () => {
  const { userId } = useAuth()
  const [chats, setChats] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/userchats/${userId}`)
      .then((res) => res.json())
      .then((data) => setChats(data))
  }, [userId, chats])

  return (
    <div className='chatlist'>
      <span className='title'>Dashboard</span>

      <Link to='/dashboard'> Create a new Chat</Link>
      <Link to='/'>Explore Gpt Clone</Link>
      <Link to='/'>Contact</Link>
      <hr />

      <span className='title'>Recent Chats</span>
      <div className='list'>
        {chats.length > 0 &&
          chats.map((chat) => (
            <Link to={`/dashboard/chat/${chat._id}`} key={chat._id}>
              {chat.title}
            </Link>
          ))}
        {chats.length === 0 && <span>No chats yet</span>}
      </div>

      <hr />
    </div>
  )
}

export default ChatList
