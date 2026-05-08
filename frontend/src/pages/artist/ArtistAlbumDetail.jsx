import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "@/api/axios.js";

function ArtistAlbumDetail() {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);

    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

    useEffect(() => {
        fetchAlbum();
    }, []);

    const fetchAlbum = async () => {
        try {
            const res = await API.get(`/music/album/${id}`);
            setAlbum(res.data.album);
        } catch (err) {
            console.log(err);
        }
    };

    // 🎵 PLAY SONG
    const playSong = (music) => {
        setCurrentSong(music);

        if (audioRef.current) {
            audioRef.current.pause();
        }

        setTimeout(() => {
            audioRef.current = new Audio(music.uri);
            audioRef.current.play();
            setIsPlaying(true);
        }, 100);
    };

    // ⏸ PAUSE SONG
    const pauseSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    if (!album) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
                <p className="text-gray-400 animate-pulse">Loading album...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-10 pb-32">

            {/* Album Card */}
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg">

                {/* Title */}
                <h1 className="text-4xl font-bold text-center mb-10">

                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        {album.title}
                    </span>

                    <span className="ml-2 text-white">📀</span>

                </h1>



                <p className="text-gray-400 text-sm mb-6">
                    🎧 {album.music?.length || 0} Tracks in this album
                </p>

                <div className="h-px bg-gradient-to-r from-pink-500/40 to-purple-500/40 mb-6"></div>

                <h2 className="text-lg font-semibold mb-4 text-purple-300">
                    Songs List
                </h2>

                <div className="space-y-3">

                    {album.music?.map((m, index) => (
                        <div
                            key={m._id}
                            className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition p-3 rounded-lg border border-white/10 group"
                        >

                            {/* Left */}
                            <div className="flex items-center gap-3">

                                <img
  src={m.coverImage || "https://via.placeholder.com/50"}
  alt="cover"
  className="w-10 h-10 rounded-md object-cover border border-white/20"
/>

                                <p className="font-medium group-hover:text-pink-400 transition">
                                    🎵 {m.title}
                                </p>

                            </div>

                            {/* Play Button */}
                            <div
                                onClick={() => playSong(m)}
                                className="cursor-pointer text-gray-400 group-hover:text-pink-400 text-xl"
                            >
                                ▶
                            </div>

                        </div>
                    ))}

                </div>
            </div>

            {/* 🎧 MINI PLAYER (FIXED BOTTOM BAR) */}
            {currentSong && (
                <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 flex items-center justify-between border-t border-gray-700">

                    {/* Song Info */}
                    <div>
                        <p className="text-sm text-gray-400">Now Playing</p>
                        <p className="font-semibold">{currentSong.title}</p>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-3">

                        {isPlaying ? (
                            <button
                                onClick={pauseSong}
                                className="px-4 py-1 bg-red-500 rounded"
                            >
                                Pause ⏸
                            </button>
                        ) : (
                            <button
                                onClick={() => playSong(currentSong)}
                                className="px-4 py-1 bg-green-500 rounded"
                            >
                                Play ▶
                            </button>
                        )}

                    </div>

                </div>
            )}

        </div>
    );
}

export default ArtistAlbumDetail;