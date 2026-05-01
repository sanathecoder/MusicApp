import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // ✅ SAFE CONDITIONAL RENDER (after hooks)
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  if (hideNavbar) return null;

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black border-b border-white/10 text-white px-6 py-3 flex justify-between items-center shadow-lg">

      {/* Logo */}
      <h1
        className="text-xl font-bold cursor-pointer bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        onClick={() => navigate("/")}
      >
        🎧 MusicApp
      </h1>

      <div className="flex items-center gap-6 relative" ref={menuRef}>

        {/* USER MENU */}
        {user?.role === "user" && (
          <div className="relative">
            <button onClick={() =>
              setOpenMenu(openMenu === "user" ? null : "user")
            }>
              🎶 Explore ▼
            </button>

            {openMenu === "user" && (
              <div className="absolute right-0 mt-3 w-44 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-3 shadow-xl">

                <Link
                  to="/"
                  onClick={() => setOpenMenu(null)}
                  className="block px-3 py-2 rounded-lg hover:bg-pink-500/20 hover:text-pink-300 transition"
                >
                  🎵 All Music
                </Link>

                <Link
                  to="/albums"
                  onClick={() => setOpenMenu(null)}
                  className="block px-3 py-2 rounded-lg hover:bg-purple-500/20 hover:text-purple-300 transition"
                >
                  💿 Albums
                </Link>

                <Link
                  to="/myPlaylist"
                  onClick={() => setOpenMenu(null)}
                  className="block px-3 py-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-300 transition"
                >
                  🎶 My Playlist
                </Link>

                <Link
                  to="/playlist"
                  onClick={() => setOpenMenu(null)}
                  className="block px-3 py-2 rounded-lg hover:bg-pink-500/20 hover:text-pink-300 transition"
                >
                  ➕ Create Playlist
                </Link>

              </div>
            )}
          </div>
        )}

        {/* ARTIST MENU */}
        {user?.role === "artist" && (
          <div className="relative">
            <button onClick={() =>
              setOpenMenu(openMenu === "artist" ? null : "artist")
            }>
              🎤 Manage ▼
            </button>

            {openMenu === "artist" && (
              <div className="absolute right-0 mt-3 w-52 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-3 shadow-xl">

                <Link to="/artist/dashboard" className="block px-3 py-2 rounded-lg hover:bg-pink-500/20 hover:text-pink-300 transition">
                  🎤 Dashboard
                </Link>

                <Link to="/upload" className="block px-3 py-2 rounded-lg hover:bg-purple-500/20 hover:text-purple-300 transition">
                  ⬆️ Upload Music
                </Link>

                <Link to="/create-album" className="block px-3 py-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-300 transition">
                  📀 Create Album
                </Link>

                <Link to="/my-albums" className="block px-3 py-2 rounded-lg hover:bg-pink-500/20 hover:text-pink-300 transition">
                  🎼 My Albums
                </Link>

                <Link to="/my-musics" className="block px-3 py-2 rounded-lg hover:bg-green-500/20 hover:text-green-300 transition">
                  🎵 My Music
                </Link>

              </div>
            )}
          </div>
        )}

        {/* AUTH */}
        {!user && (
          <div className="flex gap-4">
            <Link to="/login" className="px-5 py-2 rounded-lg font-medium text-white 
bg-white/10 backdrop-blur-lg border border-white/20 
hover:bg-white/20 hover:border-white/30 
transition duration-300 active:scale-95">Login</Link>
            <Link to="/register" className="px-5 py-2 rounded-lg font-medium text-white 
bg-white/10 backdrop-blur-lg border border-white/20 
hover:bg-white/20 hover:border-white/30 
transition duration-300 active:scale-95">Register</Link>
          </div>
        )}

        {/* LOGOUT */}
        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg font-medium text-white 
  bg-gradient-to-r from-red-500 to-pink-500 
  hover:from-red-600 hover:to-pink-600 
  hover:shadow-lg hover:shadow-red-500/30 
  transition duration-300 active:scale-95"
          >
            🚪 Logout
          </button>
        )}

      </div>
    </div>
  );
}

export default Navbar;