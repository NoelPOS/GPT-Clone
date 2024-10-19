import './Chat.css'
import NewPrompt from '../../components/newprompt/NewPrompt'
import { useLocation } from 'react-router-dom'
import Markdown from 'react-markdown'
import { IKImage } from 'imagekitio-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'

const ChatPage = () => {
  const [add, setAdd] = useState(false)
  const [chat, setChat] = useState(null)
  const path = useLocation().pathname
  const chatId = path.split('/').pop()
  const { userId } = useAuth()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}/${userId}`, {})
      .then((res) => res.json())
      .then((data) => setChat(data))
  }, [add, chatId, userId])

  return (
    <div className='chatPage'>
      <div className='wrapper'>
        <div className='chat'>
          {chat &&
            chat?.history?.map((message, i) => (
              <>
                {message.img && (
                  <img src={message ? message.img : ''} alt='img' />
                )}
                <div
                  className={
                    message.role === 'user' ? 'message user' : 'message'
                  }
                  key={i}
                >
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              </>
            ))}

          <NewPrompt chatId={chatId} data={chat} setAdd={setAdd} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
