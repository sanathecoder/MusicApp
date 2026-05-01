const musicModel = require("../models/music.model")
const { uploadFile } = require("../services/storage.service")
const albumModel = require("../models/album.model");
const playlistModel = require("../models/playlist.model");

async function createMusic(req, res) {
  try {
    const { title } = req.body;

    // ✅ get files
    const musicFile = req.files?.music?.[0];
    const coverFile = req.files?.cover?.[0];

    // ❌ agar files missing
    if (!musicFile || !coverFile) {
      return res.status(400).json({
        message: "Music and Cover both are required"
      });
    }

    // 🎵 upload music
    const musicResult = await uploadFile(
      musicFile.buffer.toString("base64")
    );

    // 🖼 upload cover
    const coverResult = await uploadFile(
      coverFile.buffer.toString("base64")
    );

    // 💾 save DB
    const music = await musicModel.create({
      uri: musicResult.url,
      coverImage: coverResult.url,
      title,
      artist: req.user.id
    });

    res.status(201).json({
      message: "Music Created",
      music
    });

  } catch (err) {
    console.log("UPLOAD ERROR:", err.message);

    return res.status(500).json({
      message: "Upload failed",
      error: err.message
    });
  }
}


async function createAlbum(req, res) {

    const { title, music } = req.body
    const album = await albumModel.create({
        title,
        artist: req.user.id,
        music: music
    })

    res.status(201).json({
        message: "Album Created Sucessfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            music: album.music
        }
    })

}


async function getAllMusic(req, res) {
    const musics = await musicModel.find().populate("artist", "username email")

    res.status(200).json({
        message: "Music fetch Successfully",
        musics: musics
    })
}


async function getAllAlbum(req, res) {
    const albums = await albumModel.find().populate("artist", "username email").populate("music")
    res.status(200).json({
        message: " Album fetch successfully",
        albums: albums
    })
}

async function getmyAlbum(req, res) {

    const musics = await albumModel.find({ artist: req.user.id })
    res.status(200).json({
        message: " Fetch Your Albums ",
        musics 
    })
}

async function getmyMusic(req, res) {
  const musics = await musicModel.find({
    artist: req.user.id
  });

  res.status(200).json({
    musics
  });
}

async function getSingleAlbum(req, res) {
    try {
        const { id } = req.params;

        const album = await albumModel
            .findById(id)
            .populate("artist", "username email")
            .populate({
                path: "music",
                populate: {
                    path: "artist",
                    select: "username email"
                }
            });

        if (!album) {
            return res.status(404).json({
                message: "Album not found",
            });
        }

        res.status(200).json({
            message: "Album fetched successfully",
            album,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
}

async function  MyAlbumMusiclist(req,res){
  const album = await albumModel
    .findById(req.params.id)
    .populate("music");

  res.json({ album });
}


async function  DeleteAlbum(req, res) {
  try {
    await albumModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Album deleted successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Delete failed"
    });
  }
}

async function DeleteMyMusic(req, res)  {
  try {
     const musics = await musicModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Music deleted successfully",
      musics
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}


async function AddPlaylist(req,res){
  

  try {
      const {title, songs} = req.body

      // Validation 
if (!title || !songs || songs.length === 0) {
  return res.status(400).json({
    message: "Title and songs are required"
  });
}


  const playlist = await playlistModel.create({
    title,
    songs : songs,
    user : req.user.id
  })

  res.status(201).json({
    message: "playlist created successfully",
     playlist: {
            id: playlist._id,
            title: playlist.title,
            user: playlist.user,
            songs: playlist.songs
        }
  })
  } catch (error) {
    console.log(error)
    res.status(500).jason({
       message: "Failed to create playlist"
    })
    
  }

}


async function getMyPlaylists(req, res) {
  try {
    const playlists = await playlistModel
      .find({ user: req.user.id })
      .populate("songs");

    res.json({ playlists });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching playlists" });
  }
}

async function getPlaylistById(req, res) {
  try {
    const playlist = await playlistModel
      .findById(req.params.id)
      .populate("songs");

    res.json({ playlist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching playlist" });
  }
}

async function deletePlaylist(req, res) {
  try {
    const playlist = await playlistModel.findById(req.params.id);

    // ❌ agar playlist exist hi nahi karti
    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found"
      });
    }

    // 🔐 (optional but recommended) ownership check
    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this playlist"
      });
    }

    // 🗑 delete from DB
    await playlistModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Playlist deleted successfully 🗑️"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = { createMusic, createAlbum, getAllMusic, getmyMusic, getAllAlbum, getSingleAlbum, getmyAlbum , MyAlbumMusiclist, DeleteAlbum , DeleteMyMusic, AddPlaylist,getMyPlaylists ,getPlaylistById , deletePlaylist }