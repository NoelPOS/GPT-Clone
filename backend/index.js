import express from 'express'
import cors from 'cors'
import ImageKit from 'imagekit'
const Port = process.env.PORT || 3000

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT_URL,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
})

const app = express()
app.use(cors())

app.get('/api/upload', (req, res) => {
  var result = imagekit.getAuthenticationParameters()
  res.send(result)
})

app.listen(Port, () => {
  console.log('Server is running on port 3000')
})
