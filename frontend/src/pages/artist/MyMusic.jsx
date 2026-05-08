import { useEffect, useState, useContext } from "react";
import API from "../../api/axios.js";
import { AuthContext } from "../../context/AuthContext";

function MyMusic() {
  const [music, setMusic] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
  if (!user?.id) return;

  fetchMyMusic();
}, [user]);


  const fetchMyMusic = async () => {
    try {
      const res = await API.get("/music/my-music");
      setMusic(res.data.musics);

     

     
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMusic = async (id) => {
    try {
      await API.delete(`/music/${id}`);
      setMusic((prev) => prev.filter((m) => m._id !== id));
      alert("Music Deleted 🗑️");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-10">

      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10">
        🎤
        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
           My Music Library
        </span>
      </h1>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

     {music.map((m) => (
  <div
    key={m._id}
    className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 mb-4 
               transition duration-300 hover:scale-[1.02] hover:border-pink-400/40"
  >

    {/* ✨ GLOW BACKGROUND */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-pink-500/0 
                    opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

    {/* CONTENT */}
    <div className="relative z-10">

      {/* TOP ROW */}
      <div className="flex items-center gap-4">

        {/* 🖼 IMAGE */}
        <div className="relative">
          <img
            src={m.coverImage || "https://via.placeholder.com/100"}
            alt="cover"
            className="w-16 h-16 object-cover rounded-lg"
          />

          {/* ✨ IMAGE GLOW */}
          <div className="absolute inset-0 rounded-lg bg-pink-500/20 opacity-0 group-hover:opacity-100 blur-md transition"></div>
        </div>

        {/* 🎵 TITLE + AUDIO */}
        <div className="flex-1">

          <h2 className="text-sm font-semibold mb-2 group-hover:text-pink-400 transition">
            🎵 {m.title}
          </h2>

          <audio controls className="w-full h-8 opacity-90 group-hover:opacity-100 transition">
            <source src={m.uri} />
          </audio>

        </div>

      </div>

      {/* 🔽 DELETE BUTTON */}
      <button
        onClick={() => deleteMusic(m._id)}
        className="w-full mt-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm transition 
                   hover:shadow-lg hover:shadow-red-500/30"
      >
        🗑 Delete Music
      </button>

    </div>

  </div>
))}

      </div>

      {/* Empty State */}
      {music.length === 0 && (
        <div className="text-center mt-10 text-gray-400">
          No music found 🎧
        </div>
      )}

    </div>
  );
}

export default MyMusic;