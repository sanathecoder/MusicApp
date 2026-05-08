import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios.js";

function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    API.get(`/music/albums/${id}`).then((res) => {
      setAlbum(res.data.album);
    });
  }, [id]);

  if (!album) {
    return (
      <div className="text-white text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">

      {/* Album Header */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          {album.title}
        </span>

        <span className="ml-3 text-white">📀</span>
      </h1>


      {/* Songs Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {album.music.map((song) => (
          <div
            key={song._id}
            className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 transition duration-300 hover:scale-[1.03] hover:border-pink-400/40"
          >

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

            <div className="relative z-10">

              {/* TOP ROW */}
              <div className="flex items-center gap-4">

                {/* COVER IMAGE */}
                <div className="relative">
                  <img
                    src={song.coverImage || "https://via.placeholder.com/100"}
                    alt="cover"
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  {/* glow on image */}
                  <div className="absolute inset-0 rounded-lg bg-pink-500/20 opacity-0 group-hover:opacity-100 blur-md transition"></div>
                </div>

                {/* TITLE + ARTIST + AUDIO */}
                <div className="flex-1">

                  <h2 className="text-sm font-semibold group-hover:text-pink-400 transition">
                    🎵 {song.title}
                  </h2>

                  <p className="text-xs text-gray-400 mb-2">
                    {song.artist?.username || "Unknown Artist"}
                  </p>

                  <audio controls className="w-full h-8 opacity-90 group-hover:opacity-100 transition">
                    <source src={song.uri} type="audio/mp3" />
                  </audio>

                </div>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AlbumDetail;