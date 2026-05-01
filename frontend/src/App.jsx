import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Navbar from "./components/Navbar";

  // User Import Pages 
import Home from "./pages/user/Home";
import Albums from "./pages/user/Albums";
import AlbumDetail from "./pages/user/AlbumDetail";
import CreatePlaylist from "./pages/user/CreatePlaylist";
import MyPlaylists from "./pages/user/MyPlaylists";
import MyPlaylistDetail from "./pages/user/MyPlaylistDetail";

// Artist Import Pages 
import CreateAlbum from "./pages/artist/CreateAlbum";
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import UploadMusic from "./pages/artist/UploadMusic";
import MyAlbums from "./pages/artist/MyAlbums";
import ArtistAlbumDetail from "./pages/artist/ArtistAlbumDetail";
import MyMusic from "./pages/artist/MyMusic";





function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* USER */}
        <Route path="/" element={ 
      <Home />}
     />
        <Route path="/albums" element={<Albums />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/album/:id" element={<AlbumDetail />} />
        <Route path="/playlist" element={<CreatePlaylist />} />
        <Route path="/myPlaylist" element={<MyPlaylists />} />
        <Route path="/playlistDetail/:id" element={<MyPlaylistDetail />} />


        {/* ARTIST */}
        <Route path="/artist/dashboard" element={<ArtistDashboard />} />
        <Route path="/upload" element={<UploadMusic />} />
        <Route path="/create-album" element={<CreateAlbum />} />
        <Route path="/my-albums" element={<MyAlbums />} />
        <Route path="/my-musics" element={<MyMusic />} />
        <Route path="/artist-album/:id" element={<ArtistAlbumDetail />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;