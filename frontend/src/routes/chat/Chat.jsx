import './Chat.css'
import NewPrompt from '../../components/newprompt/NewPrompt'
import { useLocation } from 'react-router-dom'
import Markdown from 'react-markdown'
import { IKImage } from 'imagekitio-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'

const ChatPage = () => {
  const [chat, setChat] = useState(null)
  const path = useLocation().pathname
  const chatId = path.split('/').pop()
  const { userId } = useAuth()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}/${userId}`, {})
      .then((res) => res.json())
      .then((data) => setChat(data))
  }, [chatId])

  return (
    <div className='chatPage'>
      <div className='wrapper'>
        <div className='chat'>
          {chat && (
            <>
              {chat.history.map((item, index) => (
                <div key={index} className={`message ${item.role}`}>
                  {item.parts.map((part, index) => (
                    <div key={index}>
                      {part.text && <Markdown>{part.text}</Markdown>}
                      {part.img && (
                        <IKImage
                          className='image'
                          path={part.img}
                          lqip={{ active: true }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}

          <NewPrompt chatId={chatId} data={chat} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
