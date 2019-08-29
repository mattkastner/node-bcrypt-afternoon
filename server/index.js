require('dotenv').config()

const express = require('express')
const cors = require('cors')
const massive = require('massive')
const session = require('express-session')

const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddle')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()
app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000
    }
}))

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DATABASE')
})

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.adminsOnly, treasureCtrl.getAllTreasure)

app.listen(SERVER_PORT, () => {
    console.log('SERVER')
})