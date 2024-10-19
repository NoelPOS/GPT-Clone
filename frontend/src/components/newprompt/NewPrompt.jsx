import React, { useEffect, useRef, useState } from 'react'
import './NewPrompt.css'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'
import model from '../../lib/gemini'
import Markdown from 'react-markdown'
import { useAuth } from '@clerk/clerk-react'

const NewPrompt = ({ chatId, data, setAdd }) => {
  const { userId } = useAuth()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [img, setImg] = useState({
    isLoading: false,
    dbData: {},
    aiData: {},
  })
  const endRef = useRef(null)

  const chat = model.startChat({
    // history: [
    //   data?.history.map(({ role, parts }) => ({
    //     role,
    //     parts: [{ text: parts[0].text }],
    //   })),
    // ],
  })

  const add = async (text) => {
    setAdd((prev) => !prev)
    setQuestion(text)

    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length ? [img.aiData, text] : [text]
    )
    let accumulatedText = ''
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      accumulatedText += chunkText
      setAnswer(accumulatedText)
    }

    const updatedChat = await fetch(
      `${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          question: text,
          answer: accumulatedText,
          img: img.dbData.url,
        }),
      }
    ).then((res) => res.json())

    // setImg({
    //   isLoading: false,
    //   dbData: {},
    //   aiData: {},
    // })

    return updatedChat
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = e.target.text.value
    add(text)
    e.target.text.value = ''
  }

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [answer])

  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData?.url && (
        <img src={img.dbData.url} alt='' style={{ width: '100%' }} />
      )}
      {question && <div className='message user'>{question}</div>}
      {answer && (
        <div className='message'>
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <form className='newForm' onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id='file' type='file' multiple={false} hidden />
        <input type='text' name='text' placeholder='Ask anything...' />
        <button>
          <img src='/arrow.png' alt='' />
        </button>
      </form>
      <div className='endChat' ref={endRef}></div>
    </>
  )
}

export default NewPrompt
