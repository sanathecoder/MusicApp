function validateFile(req, res, next) {
  const music = req.files?.music?.[0];
  const cover = req.files?.cover?.[0];

  // 🎵 Music check
  if (music && !music.mimetype.startsWith("audio/")) {
    return res.status(400).json({ message: "Only audio files allowed" });
  }

  // 🖼 Image check
  if (cover && !cover.mimetype.startsWith("image/")) {
    return res.status(400).json({ message: "Only image files allowed" });
  }

  next();
}




module.exports = validateFile;