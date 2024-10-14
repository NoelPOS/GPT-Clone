import React from 'react'
import './ChatList.css'
import { Link } from 'react-router-dom'

const ChatList = () => {
  return (
    <div className='chatlist'>
      <span className='title'>Dashboard</span>

      <Link to='/dashboard'> Create a new Chat</Link>
      <Link to='/'>Explore Gpt Clone</Link>
      <Link to='/'>Contact</Link>
      <hr />

      <span className='title'>Recent Chats</span>
      <div className='list'>
        <Link to='/dashboard/chat/1'>Chat 1</Link>
        <Link to='/dashboard/chat/2'>Chat 2</Link>
        <Link to='/dashboard/chat/3'>Chat 3</Link>
        <Link to='/dashboard/chat/4'>Chat 4</Link>
        <Link to='/dashboard/chat/5'>Chat 5</Link>
        <Link to='/dashboard/chat/5'>Chat 5</Link>
        <Link to='/dashboard/chat/5'>Chat 5</Link>
        <Link to='/dashboard/chat/5'>Chat 5</Link>
        <Link to='/dashboard/chat/5'>Chat 5</Link>
      </div>

      <hr />

      <div className='upgrade'>
        <img src='/logo.png' alt='' />
        <div className='texts'>
          <span>Upgrade to Lama AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  )
}

export default ChatList
