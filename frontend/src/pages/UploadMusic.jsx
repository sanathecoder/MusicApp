import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function UploadMusic() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null); // ⭐ NEW
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      // 🎵 music file
      formData.append("music", file);

      // 🖼 cover image
      formData.append("cover", image);

      // 📝 title
      formData.append("title", title);

      // await API.post("/music/upload", formData);
      // UploadMusic.jsx ke andar
await API.post("/music/upload", formData, {
  withCredentials: true, // ⭐ Browser ko cookies bhejne ki ijazat deta hai
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

      alert("Music Uploaded 🎵");

      setTitle("");
      setFile(null);
      setImage(null);

      navigate("/my-musics");

    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6  ">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl hover:border-pink-400 transition mb-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Upload Music
          </span>
          <span className="ml-2">🎵</span>
        </h1>

        {/* TITLE */}
        <input
          placeholder="Music Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 bg-transparent border border-gray-600 rounded-lg hover:border-pink-400 transition mb-6"
        />

        {/* 🎧 MUSIC FILE */}
        <label className="block border border-dashed border-gray-500 p-4 mb-4 rounded-lg text-center cursor-pointer hover:border-pink-400 transition mb-6">
          🎵 Upload Music File
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          {file && (
            <p className="text-green-400 text-sm mt-2">{file.name}</p>
          )}
        </label>

        {/* 🖼 COVER IMAGE (NEW) */}
        <label className="block border border-dashed border-gray-500  p-4 mb-6 rounded-lg text-center cursor-pointer hover:border-pink-400 transition mb-6 ">
          🖼 Upload Cover Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
          {image && (
            <p className="text-pink-400 text-sm mt-2">{image.name}</p>
          )}
        </label>

        {/* BUTTON */}
        <button
          onClick={upload}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold ${
            loading
              ? "bg-gray-600"
              : "bg-gradient-to-r from-pink-500 to-purple-500"
          }`}
        >
          {loading ? "Uploading..." : "Upload Music 🎧"}
        </button>

      </div>
    </div>
  );
}

export default UploadMusic;