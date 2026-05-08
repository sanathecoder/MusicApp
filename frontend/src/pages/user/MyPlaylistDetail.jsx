import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/api/axios.js";

function MyPlaylistDetail() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await API.get(`/music/playlist/${id}`);
        setPlaylist(res.data.playlist);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaylist();
  }, [id]);

  if (!playlist) {
    return (
      <div className="text-black text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">

      {/* Playlist Header */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        <span className="ml-3 text-white">📀</span> <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"> {playlist.title} </span>
      </h1>

      {/* Songs Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {playlist.songs?.map((song) => (
          <div
            key={song._id}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4"
          >

            <img
              src={song.coverImage}
              className="w-16 h-16 rounded-lg object-cover mb-2"
            />

            <h2 className="text-sm font-semibold">
              🎵 {song.title}
            </h2>

            <p className="text-xs text-gray-400 mb-2">
              {song.artist?.username}
            </p>

            <audio controls className="w-full">
              <source src={song.uri} />
            </audio>

          </div>
        ))}

      </div>
    </div>
  );
}

export default MyPlaylistDetail;