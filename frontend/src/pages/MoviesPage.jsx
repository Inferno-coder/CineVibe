import React, { useState } from "react";
import { Search, Star, Ticket, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import { THEATRE_DATA } from "../assets/theatreData";
import { Navigate, useNavigate } from "react-router-dom";

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );

  const navigate = useNavigate();
  const theatres = THEATRE_DATA[selectedLocation] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-12 px-6">
      {/* 🎥 Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 tracking-wide drop-shadow-lg">
          🎬 Now Showing in {selectedLocation}
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Browse theatres and book your vibe today!
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 w-full max-w-md shadow-lg">
          <Search className="text-yellow-300 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* 🎭 Theatre and Movies */}
      {theatres.length > 0 ? (
        theatres.map((theatre, index) => (
          <div key={index} className="mb-16">
            {/* Theatre Name */}
            <h2 className="text-2xl font-bold text-yellow-300 mb-6 border-l-4 border-yellow-400 pl-3">
              🎭 {theatre.name}
            </h2>

            {/* Movie Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {theatre.movies
                .filter((movie) =>
                  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((movie, i) => (
                  <div
                    key={i}
                    className="relative group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/30 transition-all duration-300"
                  >
                    {/* Movie Poster */}
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-72 object-cover group-hover:scale-105 group-hover:opacity-20 transition-all duration-300"
                    />

                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-lg font-bold text-yellow-300">
                        {movie.title}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {Math.floor(Math.random() * 3) + 3}.⭐ rating
                      </div>

                      {/* Showtimes */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {movie.timings.map((time) => (
                          <span
                            key={time}
                            className="bg-yellow-300/20 border border-yellow-400 text-yellow-200 px-2 py-1 rounded-md text-xs font-medium hover:bg-yellow-300 hover:text-black transition"
                          >
                            <Clock className="w-3 h-3 inline mr-1" />
                            {time}
                          </span>
                        ))}
                      </div>

                      {/* Book Button */}
                      <button
                        onClick={() =>
                          navigate("/booking", {
                            state: {
                              theatreName: theatre.name,
                              movieTitle: movie.title,
                              image: movie.image,
                              timings: movie.timings,
                            },
                          })
                        }
                        className="mt-3 flex items-center justify-center gap-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition-all duration-200"
                      >
                        <Ticket className="w-4 h-4" /> Book Now
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 text-lg">
          No theatres found for {selectedLocation}.
        </div>
      )}
    </div>
  );
}
