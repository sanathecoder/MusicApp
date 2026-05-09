import { Link } from "react-router-dom";

function ArtistDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-10">

      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10">

        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Artist Dashboard
        </span>

        <span className="ml-2 text-white">🎤</span>

      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Upload Music */}
        <Link
          to="/upload"
          className="group bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-pink-500/20 transition duration-300"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-pink-400 transition">
            ➕ Upload Music
          </h2>
          <p className="text-gray-400 text-sm">
            Add your new tracks and share with the world 🎵
          </p>
        </Link>

        {/* Create Album */}
        <Link
          to="/create-album"
          className="group bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-blue-500/20 transition duration-300"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
            📀 Create Album
          </h2>
          <p className="text-gray-400 text-sm">
            Organize your music into beautiful albums 🎧
          </p>
        </Link>

        {/* My Albums */}
        <Link
          to="/my-albums"
          className="group bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-purple-500/20 transition duration-300"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition">
            🎵 My Albums
          </h2>
          <p className="text-gray-400 text-sm">
            View and manage your uploaded collections 📁
          </p>
        </Link>

                {/* My Musics */}
        <Link
          to="/my-musics"
          className="group bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-purple-500/20 transition duration-300"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition">
            🎵 My Musics
          </h2>
          <p className="text-gray-400 text-sm">
            View and manage your uploaded collections 📁
          </p>
        </Link>

      </div>

      {/* Footer hint */}
      <p className="text-center text-gray-500 mt-10 text-sm">
        Manage your music like a pro 🎶
      </p>

    </div>
  );
}

export default ArtistDashboard;