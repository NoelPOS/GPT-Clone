import React, { useEffect, useRef } from 'react'
import './Chat.css'
import NewPrompt from '../../components/newprompt/NewPrompt'

const Chat = () => {
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  const endRef = useRef(null)
  return (
    <div className='chatPage'>
      <div className='wrapper'>
        <div className='chat'>
          <div className='message'>Message from ai</div>
          <div className='message user'>Message from user</div>
          <div className='message'>Message from ai</div>
          <div className='message user'>Message form</div>
        </div>
        <div className='chat'>
          <div className='message'>Message from ai</div>
          <div className='message user'>Message from user</div>
          <div className='message'>Message from ai</div>
          <div className='message user'>Message form</div>
        </div>
        <div className='chat'>
          <div className='message'>Message from ai</div>
          <div className='message user'>Message from user</div>
          <div className='message'>Message from ai</div>
          <div className='message user'>Message form</div>
        </div>
        <div className='chat'>
          <div className='message'>Message from ai</div>
          <div className='message user'>Message from user</div>
          <div className='message'>Message from ai</div>
          <div className='message user'>Message form human</div>
        </div>
        <div ref={endRef}></div>
        <NewPrompt />
      </div>
    </div>
  )
}

export default Chat
