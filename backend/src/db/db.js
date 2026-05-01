const mongoose = require('mongoose')

async function DbConnect(params) {
    mongoose.connect(process.env.DB_URL)
    console.log("Database Connected")
    
}

module.exports = DbConnect;