import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Navbar from "./components/Navbar";

  // User Import Pages 
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import CreatePlaylist from "./pages/CreatePlaylist";
import MyPlaylists from "./pages/MyPlaylists";
import MyPlaylistDetail from "./pages/MyPlaylistDetail";

// Artist Import Pages 
import CreateAlbum from "./pages/CreateAlbum";
import ArtistDashboard from "./pages/ArtistDashboard";
import UploadMusic from "./pages/UploadMusic";
import MyAlbums from "./pages/MyAlbums";
import ArtistAlbumDetail from "./pages/ArtistAlbumDetail";
import MyMusic from "./pages/MyMusic";





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