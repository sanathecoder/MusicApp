import { useEffect, useState } from "react";
import API from "../../api/axios";
import {useNavigate} from 'react-router-dom'


function MyAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

      const navigate = useNavigate()


      

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
  try {
    setLoading(true);
    const res = await API.get("/music/my-album");
    setAlbums(res.data.musics);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  // ❌ DELETE ALBUM
  const deleteAlbum = async (id) => {
    try {
      await API.delete(`/music/album/${id}`);

      // refresh list after delete
      setAlbums(albums.filter((a) => a._id !== id));

      alert("Album Deleted 🗑️");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // 👁 VIEW ALBUM (simple version)
  const viewAlbum = (album) => {
    alert(`Album: ${album.title}\nSongs: ${album.music?.length || 0}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-10">

        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          My Albums
        </span>

        <span className="ml-2 text-white">🎧</span>

      </h1>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {albums.map((a) => (
          <div
            key={a._id}
            className="group bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-2xl shadow-lg hover:scale-105 hover:shadow-pink-500/20 transition duration-300"
          >

            {/* Title */}
            <h2 className="text-xl font-semibold mb-2 group-hover:text-pink-400 transition">
              📀 {a.title}
            </h2>

            {/* Info */}
            <p className="text-gray-400 text-sm mb-4">
              🎵 {a.music?.length || 0} Songs
            </p>

            {/* Buttons */}
            <div className="flex gap-2">

              {/* VIEW */}
              <button
                onClick={() => navigate(`/artist-album/${a._id}`)}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm transition"
              >
                View
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteAlbum(a._id)}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-sm transition"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Empty state */}
      {albums.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No albums found 😔
        </p>
      )}

    </div>
  );
}

export default MyAlbums;