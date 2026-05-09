import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Albums() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    API.get("/music/albums").then((res) => {
      setAlbums(res.data.albums);
    });
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">

      <h1 className="text-4xl font-bold mb-8 text-center">

        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Music Albums
        </span>

        <span className="ml-3 text-white">🎧</span>

      </h1>

      {/* Grid Layout */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {albums.map((a) => (
          <div
            key={a._id}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-lg hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 transition duration-300"
          >
            {/* Album Title */}
            <h2 className="text-xl font-semibold mb-2 text-pink-400">
              {a.title}
            </h2>

            {/* Artist */}
            <p className="text-gray-300 mb-1">
              👤 {a.artist?.username || "Unknown"}
            </p>

            {/* Songs Count */}
            <p className="text-gray-400 text-sm">
              🎵 {a.music?.length || 0} Songs
            </p>

            {/* Divider */}
            <div className="my-3 border-t border-gray-600"></div>

            {/* Button */}
            <button
              onClick={() => navigate("/album/" + a._id)}
              className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white py-2 rounded-lg transition"
            >
              View Album
            </button>
          </div>
        ))}

      </div>

      {/* Empty State */}
      {albums.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No albums found 😔
        </p>
      )}

    </div>
  );
}

export default Albums;