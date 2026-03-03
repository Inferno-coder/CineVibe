import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { StarIcon, Clock, Calendar, Play, Heart } from "lucide-react";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurColor from "../components/BlurColor";
import DateSelect from "../components/DateSelect";

const MovieDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const movie = dummyShowsData.find((show) => String(show._id) === id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Movie not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background glow */}
      <BlurColor top="120px" left="-120px" size={500} />
      <BlurColor bottom="80px" right="-120px" size={450} />

      {/* Hero */}
      <div className="relative h-[70vh] w-full">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="relative z-10 flex h-full items-end px-6 md:px-10 pb-14">
          <div className="flex max-w-6xl flex-col gap-8 md:flex-row">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-44 md:w-56 rounded-2xl shadow-2xl"
            />

            <div>
              <p className="text-sm uppercase tracking-widest text-gray-400">
                {movie.original_language.toUpperCase()}
              </p>

              <h1 className="mt-2 text-3xl md:text-5xl font-bold">
                {movie.title}
              </h1>

              <p className="mt-2 italic text-gray-300">{movie.tagline}</p>

              {/* Meta */}
              <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2 text-yellow-400">
                  <StarIcon className="h-4 w-4 fill-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                  <span className="text-gray-400">
                    ({movie.vote_count.toLocaleString()})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {movie.runtime} min
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(movie.release_date).getFullYear()}
                </div>
              </div>

              {/* Genres */}
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-white/10 px-4 py-1 text-xs backdrop-blur-md"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex items-center gap-4">
                <button className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 backdrop-blur-md transition hover:bg-white/20">
                  <Play className="h-4 w-4" />
                  Watch Trailer
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("dateSelect")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-xl bg-red-600 px-8 py-3 font-semibold transition hover:bg-red-700"
                >
                  Book Tickets
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="rounded-full bg-white/10 p-3 backdrop-blur-md transition hover:bg-white/20"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="relative z-10 max-w-5xl px-6 md:px-10 py-16">
        <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
        <p className="leading-relaxed text-gray-300">{movie.overview}</p>
      </div>

      {/* Cast Section */}
      <div className="relative z-10 px-6 md:px-10 pb-24">
        <h2 className="mb-8 text-2xl font-semibold">Your Favorite Cast</h2>

        <div className="flex gap-8 overflow-x-auto scrollbar-hide">
          {movie.casts.slice(0, 7).map((cast, index) => (
            <div
              key={index}
              className="min-w-[140px] flex flex-col items-center text-center transition hover:scale-105"
            >
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="h-40 w-40 rounded-full object-cover shadow-xl"
              />
              <p className="mt-4 text-sm font-medium text-white">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect id={id} dateTime={dummyDateTimeData} />
    </div>
  );
};

export default MovieDetails;
