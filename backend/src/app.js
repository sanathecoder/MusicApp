const express = require('express')
const cookieparser =require("cookie-parser")
const cors = require('cors')
const authRouter = require('./routes/auth.routes')
const musicRouter = require("./routes/music.routes")
const app = express()


app.use(express.json())
app.use(cookieparser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use('/api/auth', authRouter)
app.use('/api/music',musicRouter)

module.exports = app