const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 9000, () => console.log(`Listening on port ${process.env.PORT || 9000}`))
