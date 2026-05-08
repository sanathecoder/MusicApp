import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import {useNavigate} from "react-router-dom"

function CreatePlaylist() {
  const [title, setTitle] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const res = await API.get("/music"); // all music
      setMusicList(res.data.musics);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSelect = (id) => {
    if (selectedSongs.includes(id)) {
      setSelectedSongs(selectedSongs.filter((s) => s !== id));
    } else {
      setSelectedSongs([...selectedSongs, id]);
    }
  };

  const createPlaylist = async () => {
    try {
      setLoading(true);

      await API.post("/music/playlist", {
        title,
        songs: selectedSongs,
      });

      alert("Playlist Created 🎧");
      setTitle("");
      setSelectedSongs([]);

      navigate('/myPlaylist')

    } catch (err) {
      console.log(err);
      alert("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">

        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Create Playlist 🎧
        </h1>

        {/* TITLE */}
        <input
          placeholder="Playlist Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-6 bg-black/40 border border-gray-600 rounded-lg"
        />

        {/* SONGS */}
        <div className="space-y-3 max-h-80 overflow-y-auto">

          {musicList.map((m) => (
            <div
              key={m._id}
              onClick={() => toggleSelect(m._id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition
                ${selectedSongs.includes(m._id)
                  ? "bg-pink-500/20 border-pink-400"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
            >

              <img
                src={m.coverImage || null}
                className="w-12 h-12 rounded object-cover"
              />

              <p className="flex-1">{m.title}</p>

              {selectedSongs.includes(m._id) && "✔"}
            </div>
          ))}

        </div>

        {/* BUTTON */}
        <button
          onClick={createPlaylist}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500"
        >
          {loading ? "Creating..." : "Create Playlist"}
        </button>

      </div>
    </div>
  );
}

export default CreatePlaylist;