const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require("method-override")
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const dashboardRoutes = require('./routes/dashboard')
const projectRoutes = require('./routes/project')
const taskRoutes = require('./routes/task')

require('dotenv').config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

// Connect to MongoDB
connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
app.use(methodOverride("_method"))

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/project', projectRoutes)
app.use('/task', taskRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running, you better catch it!`)
})