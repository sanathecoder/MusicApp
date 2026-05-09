const express = require('express')
const cookieparser =require("cookie-parser")
const cors = require('cors')
const authRouter = require('./routes/auth.routes')
const musicRouter = require("./routes/music.routes")
const app = express()


app.use(express.json())
app.use(cookieparser())
// app.use(cors({
//   origin: "https://music-app-kappa-sand.vercel.app", // mera naya domain
//   credentials: true
// }));
const allowedOrigins = [
  "http://localhost:5173", 
  "https://music-app-kappa-sand.vercel.app",
  // Ye neeche wali line aapke har Vercel preview link ko ijazat degi
  /\.vercel\.app$/ 
];

app.use(cors({
  origin: function (origin, callback) {
    // Agar origin list mein hai ya Vercel ka domain hai, to allow karein
    if (!origin || allowedOrigins.some(pattern => 
      typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked this origin'));
    }
  },
  credentials: true
}));

app.use('/api/auth', authRouter)
app.use('/api/music',musicRouter)

module.exports = app