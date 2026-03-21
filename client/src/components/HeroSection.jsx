import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ArrowRight, Calendar, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { movies } = useContext(AppContext);

  // Use the first movie as the featured one
  const featuredMovie = movies.length > 0 ? movies[0] : null;

  if (!featuredMovie) {
    return (
      <div className="relative h-[90vh] w-full bg-black flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading Featured Movie...</div>
      </div>
    );
  }

  const releaseYear = featuredMovie.release_date
    ? new Date(featuredMovie.release_date).getFullYear()
    : "N/A";
  const runtimeHours = Math.floor((featuredMovie.runtime || 0) / 60);
  const runtimeMinutes = (featuredMovie.runtime || 0) % 60;

  return (
    <div
      className="relative h-[90vh] w-full bg-cover bg-center flex items-end transition-all duration-700"
      style={{ backgroundImage: featuredMovie.backdrop_path ? `url("${featuredMovie.backdrop_path}")` : "none" }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-20 pb-20 md:pb-28 max-w-4xl text-white">
        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {featuredMovie.genres &&
            featuredMovie.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium tracking-wider"
              >
                {genre.name}
              </span>
            ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-7xl font-black leading-tight drop-shadow-2xl">
          {featuredMovie.title || "CineVibe Featured"}
        </h1>

        {/* Tagline or Overview */}
        <p className="mt-4 text-sm md:text-lg text-gray-300 line-clamp-2 md:line-clamp-3 max-w-2xl drop-shadow-lg">
          {featuredMovie.tagline || featuredMovie.overview || "Loading movie details..."}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-6 mt-8 text-sm font-medium text-gray-200">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-red-500" />
            <span>{releaseYear}</span>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon size={16} className="text-red-500" />
            <span>
              {runtimeHours > 0 ? `${runtimeHours}h ` : ""}{runtimeMinutes}m
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold">★ {featuredMovie.vote_average?.toFixed(1) || "0.0"}</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            onClick={() => navigate("/movies")}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition px-8 py-3.5 rounded-xl font-bold shadow-xl active:scale-95"
          >
            Explore Movies
            <ArrowRight size={18} />
          </button>

          <button 
            onClick={() => navigate(`/movies/${featuredMovie._id}`)}
            className="flex items-center justify-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 transition px-8 py-3.5 rounded-xl font-bold backdrop-blur-md active:scale-95"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
