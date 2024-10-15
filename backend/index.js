import express from 'express'
import cors from 'cors'
import ImageKit from 'imagekit'
import mongoose from 'mongoose'
import Chat from './models/Chat.js'
import UserChat from './models/UserChats.js'

const Port = process.env.PORT || 3000

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
app.use(cors())
app.use(express.json())

app.get('/api/upload', (req, res) => {
  var result = imagekit.getAuthenticationParameters()
  res.send(result)
})

app.post('/api/chats', async (req, res) => {
  const { userId, text } = req.body
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

app.listen(Port, () => {
  connect()
  console.log('Server is running on port 3000')
})
