const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    title: String,
    songs:[{
        type :  mongoose.Schema.Types.ObjectId,
        ref: "music"
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const playlistModel = mongoose.model("playlist",playlistSchema)

module.exports = playlistModel;