import express from 'express'
import cors from 'cors'
import ImageKit from 'imagekit'
import mongoose from 'mongoose'
import Chat from './models/Chat.js'
import UserChat from './models/UserChats.js'
import path from 'path'
import url, { fileURLToPath } from 'url'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

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
    console.log(e)
  }
}

const app = express()
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)
app.use(express.json())

app.get('/api/upload', (req, res) => {
  var result = imagekit.getAuthenticationParameters()
  res.send(result)
})

app.post('/api/chats', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId
  const { text } = req.body
  try {
    const newChat = new Chat({
      userId: userId,
      history: [{ role: 'user', parts: [{ text }] }],
    })
    const savedChat = await newChat.save()

    const userChats = await UserChat.find({ userId: userId })

    if (!userChats.length) {
      const newUserChats = new UserChat({
        userId: userId,
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
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat.id,
              title: text.substring(0, 40),
            },
          },
        }
      )

      res.status(201).send(newChat.id)
    }
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal Server Error')
  }
})

app.get('/api/userchats', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId

  try {
    const userChats = await UserChat.findOne({ userId })
    res.status(200).send(userChats[0].chats)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error fetching user chats')
  }
})

app.get('/api/chats/:id', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId
  const chatId = req.params.id

  try {
    const chat = await Chat.findOne({ _id: chatId, userId: userId })
    res.status(200).send(chat)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error fetching chat')
  }
})

app.put('/api/chats/:id', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId
  const chatId = req.params.id

  const { question, answer, img } = req.body

  const newItems = [
    ...(question
      ? [
          {
            role: 'user',
            parts: [
              {
                text: question,
              },
            ],
            ...(img && { img }),
          },
        ]
      : []),
  ]

  try {
    const updatedChat = await Chat.updateOne(
      { _id: chatId, userId: userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    )
    res.status(200).send(updatedChat)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error adding conversation')
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(401).send('Unauthorized')
})

// Production

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

app.listen(Port, () => {
  connect()
  console.log('Server is running on port 3000')
})
