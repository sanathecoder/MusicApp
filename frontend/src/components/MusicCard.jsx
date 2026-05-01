function MusicCard({ music }) {
  return (
    <div
      className="group relative bg-white/10 backdrop-blur-lg border border-white/20 
                 rounded-xl p-4 text-white transition duration-300 
                 hover:scale-[1.03] hover:border-pink-400/40"
    >

      {/* GLOW EFFECT */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-pink-500/0 
                      opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* TOP ROW */}
        <div className="flex items-center gap-4">

          {/* COVER IMAGE */}
          <img
            src={music.coverImage || "https://via.placeholder.com/80"}
            alt="cover"
            className="w-14 h-14 rounded-lg object-cover border border-white/20"
          />

          {/* TEXT */}
          <div className="flex-1">

            <h3 className="font-bold group-hover:text-pink-400 transition">
              {music.title}
            </h3>

            <p className="text-sm text-gray-400">
              Artist: {music.artist?.username}
            </p>

          </div>

        </div>

        {/* AUDIO (same as before) */}
        <audio controls className="w-full mt-3 rounded-lg opacity-90 group-hover:opacity-100 transition">
          <source src={music.uri} />
        </audio>

      </div>
    </div>
  );
}

export default MusicCard;