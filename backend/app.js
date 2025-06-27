const express = require('express')
const app = express()

const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./routes/index')
dotenv.config()

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
