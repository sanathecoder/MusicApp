const express = require("express")
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer')


const musicController = require("../controllers/music.controller")
const validateFile = require("../middleware/validation")

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// For Artist API

//  Create music  
router.post(   "/upload", authMiddleware.AuthArtist,upload.fields([{ name: "music", maxCount: 1 },{ name: "cover", maxCount: 1 }]),validateFile,musicController.createMusic);
 // Create Album
router.post("/album", authMiddleware.AuthArtist, musicController.createAlbum)

// for artist get/ delete his music /album 
router.get("/my-album", authMiddleware.AuthArtist, musicController.getmyAlbum)
router.get("/my-music", authMiddleware.AuthArtist, musicController.getmyMusic)
router.delete("/:id", authMiddleware.AuthArtist, musicController.DeleteMyMusic);

router.get("/album/:id", authMiddleware.AuthArtist, musicController.MyAlbumMusiclist);
router.delete("/album/:id", authMiddleware.AuthArtist, musicController.DeleteAlbum);


// For User API

router.get("/",  musicController.getAllMusic)
router.get("/albums", authMiddleware.AuthUser, musicController.getAllAlbum)
router.get("/albums/:id", authMiddleware.AuthUser, musicController.getSingleAlbum);

// User PLaylist 

router.post("/playlist",authMiddleware.AuthUser, musicController.AddPlaylist)
router.get("/playlist",authMiddleware.AuthUser, musicController.getMyPlaylists)
router.get("/playlist/:id",authMiddleware.AuthUser, musicController.getPlaylistById)

// delete playlist 

router.delete(
  "/playlist/:id",
  authMiddleware.AuthUser,
  musicController.deletePlaylist
);


module.exports = router

