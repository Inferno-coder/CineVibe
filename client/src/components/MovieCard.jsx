import { StarIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const goToMovie = () => {
    navigate(`/movies/${movie.id}`);
    scrollTo(0, 0);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md
                 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <img
          onClick={goToMovie}
          src={movie.backdrop_path}
          alt={movie.title}
          className="h-full w-full cursor-pointer object-cover object-center
                     transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 text-white">
        {/* Title */}
        <p className="text-lg font-semibold leading-tight line-clamp-1">
          {movie.title}
        </p>

        {/* Meta */}
        <p className="mt-1 text-xs text-gray-300">
          {new Date(movie.release_date).getFullYear()} •{" "}
          {movie.genres
            .slice(0, 2)
            .map((genre) => genre.name)
            .join(" | ")}{" "}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={goToMovie}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium
                       transition hover:bg-red-700"
          >
            Buy Tickets
          </button>

          <div className="flex items-center gap-1 text-sm text-yellow-400">
            <StarIcon className="h-4 w-4 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
