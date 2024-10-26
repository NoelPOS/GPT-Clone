import express from 'express'
import cors from 'cors'
import ImageKit from 'imagekit'
import mongoose from 'mongoose'
import Chat from './models/Chat.js'
import UserChat from './models/UserChats.js'
import path from 'path'
import url, { fileURLToPath } from 'url'

const Port = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT_URL,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
})

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (e) {
    console.error('MongoDB connection error:', e)
    process.exit(1) // Ensure the app stops if connection fails
  }
}

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/upload', (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters()
    res.status(200).send(result)
  } catch (e) {
    console.error('Error getting ImageKit auth params:', e)
    res
      .status(500)
      .send('Failed to generate ImageKit authentication parameters')
  }
})

app.post('/api/chats', async (req, res) => {
  const { userId, text, result } = req.body

  if (!userId || !text || !result) {
    return res
      .status(400)
      .send('Missing required fields: userId, text, or result')
  }

  try {
    const newChat = new Chat({
      userId,
      history: [
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: result }] },
      ],
    })
    const savedChat = await newChat.save()

    const userChats = await UserChat.find({ userId })

    if (!userChats.length) {
      const newUserChats = new UserChat({
        userId,
        chats: [
          {
            _id: savedChat.id,
            title: text.substring(0, 40),
          },
        ],
      })
      await newUserChats.save()
    } else {
      await UserChat.updateOne(
        { userId },
        {
          $push: {
            chats: {
              _id: savedChat.id,
              title: text.substring(0, 40),
            },
          },
        }
      )
    }

    res.status(201).send(savedChat.id)
  } catch (e) {
    console.error('Error saving chat or updating user chats:', e)
    res.status(500).send('Failed to save chat or update user chats')
  }
})

app.get('/api/userchats/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const userChats = await UserChat.findOne({ userId })

    if (!userChats) {
      return res.status(404).send('No chats found for this user')
    }

    res.status(200).send(userChats.chats)
  } catch (e) {
    console.error('Error fetching user chats:', e)
    res.status(500).send('Failed to fetch user chats', e.message)
  }
})

app.get('/api/chats/:cid/:uid', async (req, res) => {
  const chatId = req.params.cid
  const userId = req.params.uid

  try {
    const chat = await Chat.findOne({ _id: chatId, userId })

    if (!chat) {
      return res.status(404).send('Chat not found')
    }

    res.status(200).send(chat)
  } catch (e) {
    console.error('Error fetching chat:', e)
    res.status(500).send('Failed to fetch chat')
  }
})

app.put('/api/chats/:id', async (req, res) => {
  const { userId, question, answer, img } = req.body
  const chatId = req.params.id

  if (!userId || !question || !answer) {
    return res
      .status(400)
      .send('Missing required fields: userId, question, or answer')
  }

  const newItems = img
    ? [
        {
          role: 'user',
          parts: [{ text: question }],
          img,
        },
        {
          role: 'model',
          parts: [{ text: answer }],
        },
      ]
    : [
        {
          role: 'user',
          parts: [{ text: question }],
        },
        {
          role: 'model',
          parts: [{ text: answer }],
        },
      ]

  try {
    const updatedChat = await Chat.updateOne(
      { _id: chatId, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    )

    if (!updatedChat.matchedCount) {
      return res.status(404).send('Chat not found for update')
    }

    res.status(200).send('Chat updated successfully')
  } catch (e) {
    console.error('Error updating chat:', e)
    res.status(500).send('Failed to update chat')
  }
})

// PRODUCTION
// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

console.log(path.join(__dirname, '../frontend/dist'))

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(Port, () => {
  connect()
  console.log(`Server is running on port ${Port}`)
})
