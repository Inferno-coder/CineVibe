import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/MovieCard";
import BlurColor from "../components/BlurColor";

const Movies = () => {
  if (!dummyShowsData.length) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-400">
        No movies available
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black px-6 md:px-10 py-16">
      {/* Background Glow */}
      <BlurColor top="150px" left="0px" />
      <BlurColor bottom="50px" right="50px" />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-white">
          Now Showing
        </h1>
        <p className="mt-2 text-sm md:text-base text-gray-400">
          Book tickets for the latest blockbusters in theatres now
        </p>
      </div>

      {/* Movies Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {dummyShowsData.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
