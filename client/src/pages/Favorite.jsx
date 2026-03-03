import React from "react";
import BlurColor from "../components/BlurColor";
import MovieCard from "../components/MovieCard";
import { dummyShowsData } from "../assets/assets";

// later you can replace this with redux / context / api data
const favoriteMovies = dummyShowsData; // example: [] or dummyShowsData

const Favorite = () => {
  return (
    <div className="relative min-h-screen bg-black px-6 md:px-10 py-16 overflow-hidden">
      {/* Background Glow */}
      <BlurColor top="120px" left="-80px" size={500} />
      <BlurColor bottom="80px" right="-100px" size={450} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-white">
            Your Favorites
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-400">
            Movies you love, all in one place
          </p>
        </div>

        {/* Empty State */}
        {!favoriteMovies.length ? (
          <div className="flex flex-col items-center justify-center mt-24 text-center">
            <div className="mb-4 text-6xl">🎬</div>
            <p className="text-lg font-medium text-white">No favorites yet</p>
            <p className="mt-2 text-sm text-gray-400">
              Start adding movies to your favorites to see them here
            </p>
          </div>
        ) : (
          /* Favorites Grid */
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
