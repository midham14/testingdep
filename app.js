const session = require('express-session')
const express = require('express')
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

require('dotenv').config()
const morgan = require('morgan')
const nodemailer = require('nodemailer')

app.use('/', routes)

app.use(morgan('dev'))


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})