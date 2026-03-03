import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlurColor from "./BlurColor";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative px-6 md:px-10 py-14">
      {/* Header */}
      <div className="relative mb-10 flex items-center justify-between">
        <BlurColor top="-90px" right="-80px" size={300} />

        <p className="text-xl md:text-2xl font-semibold tracking-wide text-white">
          Now Showing
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-white"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dummyShowsData.slice(0, 4).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Show More */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="group flex items-center gap-2 rounded-xl border border-white/20
                     bg-white/5 px-6 py-3 text-sm font-medium text-white
                     backdrop-blur-md transition hover:bg-white/10"
        >
          Show more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
