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

  console.log(chat)

  return (
    <div className='chatPage'>
      <div className='wrapper'>
        <div className='chat'>
          {chat &&
            chat?.history?.map((message, i) => (
              <>
                {message.img && (
                  <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={message.img}
                    height='300'
                    width='400'
                    transformation={[{ height: 300, width: 400 }]}
                    loading='lazy'
                    lqip={{ active: true, quality: 20 }}
                  />
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

          <NewPrompt chatId={chatId} data={chat} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
