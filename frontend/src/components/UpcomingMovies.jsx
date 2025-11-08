import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const dummyUpcoming = [
  {
    id: 1,
    title: "Indian 2",
    image:
      "https://m.media-amazon.com/images/M/MV5BOTE1M2ZkZjYtNzExNi00MTQwLTg3ZDYtYTA3YmQyMDgyZjU4XkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 2,
    title: "GOAT (The Greatest of All Time)",
    image:
      "https://m.media-amazon.com/images/M/MV5BOTE1M2ZkZjYtNzExNi00MTQwLTg3ZDYtYTA3YmQyMDgyZjU4XkEyXkFqcGc@._V1_.jpg",
  },
];

export default function UpcomingMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Set static data for now
    setMovies(dummyUpcoming);

    // 🔥 Later: fetch from TMDB
    // fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_API_KEY&region=IN&with_original_language=ta`)
    //   .then(res => res.json())
    //   .then(data => setMovies(data.results));
  }, []);

  return (
    <section className="bg-gray-900 text-white py-12 px-6 md:px-12">
      <h2 className="text-3xl font-bold mb-8 text-yellow-400">
        🎥 Upcoming Movies
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
