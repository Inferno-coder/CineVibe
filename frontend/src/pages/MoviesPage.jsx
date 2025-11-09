import React, { useState } from "react";
import { Search, Star, Ticket } from "lucide-react";
import { dummyMovies } from "../assets/dummyMovies";
import { useDispatch, useSelector } from "react-redux";

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = dummyMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-12 px-6">
      {/* 🎥 Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 tracking-wide drop-shadow-lg">
          🎬 Now Showing - {selectedLocation}
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Explore the latest blockbusters & book your vibe today!
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-12">
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

      {/* 🎞️ Movies Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/30 transition-all duration-300"
            >
              {/* Movie Poster */}
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h2 className="text-lg font-bold text-yellow-300">
                  {movie.title}
                </h2>
                <div className="flex items-center mt-1 text-sm text-gray-300">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />{" "}
                  {Math.floor(Math.random() * 3) + 3}.⭐ rating
                </div>

                {/* Book Button */}
                <button className="mt-3 flex items-center justify-center gap-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition-all duration-200">
                  <Ticket className="w-4 h-4" /> Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No movies found for “{searchTerm}”
          </div>
        )}
      </div>
    </div>
  );
}
