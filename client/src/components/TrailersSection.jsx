// TrailersSection.jsx
import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";

const TrailersSection = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(dummyTrailers[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const embedUrl = `${selectedTrailer.videoUrl.replace("/watch?v=", "/embed/")}${isPlaying ? "?autoplay=1&mute=0&rel=0" : "?autoplay=0&mute=1&rel=0"}`;

  const nextTrailer = () => {
    const next = (currentIndex + 1) % dummyTrailers.length;
    setCurrentIndex(next);
    setSelectedTrailer(dummyTrailers[next]);
  };

  const prevTrailer = () => {
    const prev =
      (currentIndex - 1 + dummyTrailers.length) % dummyTrailers.length;
    setCurrentIndex(prev);
    setSelectedTrailer(dummyTrailers[prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-indigo-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            Epic Trailers
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover breathtaking cinematic worlds through our curated
            collection of trailers
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Trailers Grid */}
          <div className="lg:col-span-8">
            {/* Main Player */}
            <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden hover:shadow-purple-500/25 transition-all duration-700">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl"
                  src={embedUrl}
                  title={selectedTrailer.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
                {/* Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center p-8">
                    <img
                      src={selectedTrailer.image}
                      alt="Trailer thumbnail"
                      className="w-48 h-32 object-cover rounded-2xl shadow-2xl absolute -bottom-24 -right-8 rotate-6 opacity-70 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                )}
                {/* Play Icon Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="bg-gradient-to-br from-white/20 to-transparent backdrop-blur-xl rounded-full p-8 shadow-2xl border-4 border-white/30 hover:scale-110 transition-all duration-500 cursor-pointer"
                      onClick={() => setIsPlaying(true)}
                    >
                      <svg
                        className="w-24 h-24 text-white drop-shadow-2xl"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Player Controls */}
              <div className="p-8 bg-black/30 backdrop-blur-md">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 ${
                        isPlaying
                          ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-500/40"
                          : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-emerald-500/40"
                      }`}
                    >
                      {isPlaying ? "⏸️ Pause" : "▶️ Play"}
                    </button>
                    <button
                      onClick={prevTrailer}
                      className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
                      title="Previous"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextTrailer}
                      className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
                      title="Next"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>4K • {Math.floor(Math.random() * 3 + 1)}:30</span>
                    <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 w-3/4 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trailers List */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">
              More Trailers
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
              {dummyTrailers.map((trailer, index) => (
                <div
                  key={trailer.videoUrl}
                  className={`group cursor-pointer p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 ${
                    currentIndex === index
                      ? "ring-4 ring-emerald-500/50 bg-emerald-500/10 border-emerald-500/50"
                      : ""
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSelectedTrailer(trailer);
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={trailer.image}
                      alt="Trailer thumbnail"
                      className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <svg
                        className="w-8 h-8 text-white ml-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-3 font-medium text-white truncate">
                    {trailer.videoUrl.split("v=")[1]?.slice(0, 20) || "Trailer"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailersSection;
