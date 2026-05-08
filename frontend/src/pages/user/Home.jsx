import { useEffect, useState } from "react";
import API from "@/api/axios.js";
import MusicCard from "../../components/MusicCard";

function Home() {
  const [music, setMusic] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    const res = await API.get("/music");
    setMusic(res.data.musics);
  };

  // 🔍 FILTER LOGIC
  const filteredMusic = music.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      {/* HERO */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-center">

          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Discover Music
          </span>

          <span className="ml-3 text-white">🎧</span>

        </h1>

        {/* SEARCH BAR */}
        <div className="mt-6 flex justify-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-3 rounded-full w-full max-w-md flex items-center">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search music..."
              className="bg-transparent outline-none w-full text-white placeholder-gray-400"
            />

          </div>
        </div>
      </div>

      {/* MUSIC GRID */}
      <div className="px-8 pb-12">

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredMusic.map((m) => (
            <div
              key={m._id}
              className="hover:scale-105 transition duration-300 hover:shadow-2xl hover:shadow-pink-500/20"
            >
              <MusicCard music={m} />
            </div>
          ))}

        </div>

        {filteredMusic.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No music found 😔
          </p>
        )}

      </div>
    </div>
  );
}

export default Home;