import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function MyPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await API.get("/music/playlist");
      setPlaylists(res.data.playlists);
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑 DELETE PLAYLIST
  const deletePlaylist = async (id) => {
    try {
      await API.delete(`/music/playlist/${id}`);

      // UI update without reload
      setPlaylists((prev) => prev.filter((p) => p._id !== id));

      alert("Playlist deleted 🗑️");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        🎧 My Playlists
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">

        {playlists?.map((p) => (
          <div
            key={p._id}
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-xl hover:scale-105 transition"
          >

            {/* TITLE */}
            <h2 className="text-xl font-semibold text-pink-400">
              📀 {p.title}
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              🎵 {p.songs?.length || 0} songs
            </p>

            {/* BUTTONS */}
            <div className="flex gap-2 mt-4">

              {/* VIEW */}
              <button
                onClick={() => navigate(`/playlistDetail/${p._id}`)}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm"
              >
                View
              </button>

              {/* DELETE */}
              <button
                onClick={() => deletePlaylist(p._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyPlaylists;