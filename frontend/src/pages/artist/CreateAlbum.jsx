import { useState, useEffect } from "react";
import API from "../../api/axios.js";
import { Navigate , useNavigate} from "react-router-dom";

function CreateAlbum() {
  const [title, setTitle] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    fetchMyMusic();
  }, []);

  const fetchMyMusic = async () => {
    try {
      const res = await API.get("/music/my-music");
      setMusicList(res.data.musics);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = (id) => {
    if (selectedMusic.includes(id)) {
      setSelectedMusic(selectedMusic.filter((m) => m !== id));
    } else {
      setSelectedMusic([...selectedMusic, id]);
    }
  };

  const create = async () => {
    try {
      setLoading(true);

      await API.post("/music/album", {
        title,
        music: selectedMusic,
      });

      alert("Album Created 📀");
      setTitle("");
      setSelectedMusic([]);
      navigate('/my-albums')

    } catch (err) {
      console.log(err);
      alert("Failed to create album");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center p-6">

      {/* CARD */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Create Album
          </span>
          <span className="ml-2">📀</span>
        </h1>

        {/* INPUT */}
        <input
          placeholder="Enter Album Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {/* MUSIC SECTION */}
        <h2 className="text-lg font-semibold mb-4 text-purple-300">
          Select Music 🎧
        </h2>

        <div className="max-h-64 overflow-y-auto space-y-3 pr-2">

          {musicList.map((m) => (
            <label
              key={m._id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
              ${selectedMusic.includes(m._id)
                  ? "bg-pink-500/20 border-pink-400"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
            >

              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={selectedMusic.includes(m._id)}
                onChange={() => handleSelect(m._id)}
                className="accent-pink-500 w-4 h-4"
              />

              {/* TEXT */}
              <span className="text-sm">{m.title}</span>

            </label>
          ))}

        </div>

        {/* BUTTON */}
        <button
          onClick={create}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg font-semibold transition
          ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
            }`}
        >
          {loading ? "Creating..." : "Create Album 📀"}
        </button>

      </div>
    </div>
  );
}

export default CreateAlbum;