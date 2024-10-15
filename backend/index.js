import express from 'express'
import cors from 'cors'
import ImageKit from 'imagekit'
import mongoose from 'mongoose'

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

app.get('/api/upload', (req, res) => {
  var result = imagekit.getAuthenticationParameters()
  res.send(result)
})

app.listen(Port, () => {
  connect()
  console.log('Server is running on port 3000')
})
