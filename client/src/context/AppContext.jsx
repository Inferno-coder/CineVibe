import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);

  // Fetch real movie data directly from TMDB API
  const getMoviesData = async () => {
    try {
      const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${tmdbToken}`,
        },
      };

      // 1. Fetch Genres and Popular Movies in parallel
      const [genresRes, popularRes] = await Promise.all([
        axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en-US", options),
        axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
      ]);

      const currentGenres = genresRes.data.genres || [];
      const popularMovies = popularRes.data.results || [];
      
      console.log("Current Genres:", currentGenres);
      console.log("Popular Movies:", popularMovies);

      if (popularMovies.length > 0) {
        // 2. Fetch full details for the first movie (to get runtime/tagline)
        const { data: featuredDetails } = await axios.get(
          `https://api.themoviedb.org/3/movie/${popularMovies[0].id}?language=en-US`,
          options
        );
        console.log("Featured Movie Details:", featuredDetails);

        // 3. Map and Format all movies
        const formattedMovies = popularMovies.map((m, index) => {
          const detailSource = index === 0 ? featuredDetails : m;

          const mappedGenres = (detailSource.genres || m.genre_ids || []).map((gOrId) => {
            if (typeof gOrId === "object") return gOrId; // Already a {id, name} object
            const found = currentGenres.find((cg) => cg.id === gOrId);
            return found ? { id: found.id, name: found.name } : { id: gOrId, name: "Unknown" };
          });

          return {
            ...m,
            ...detailSource,
            _id: m.id,
            tmdbId: m.id,
            poster_path: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            backdrop_path: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: mappedGenres,
            runtime: detailSource.runtime || 0,
          };
        });

        setGenresList(currentGenres);
        setMovies(formattedMovies);
      }
    } catch (error) {
      toast.error("Error fetching movies from TMDB");
      console.log(error);
    }
  };

  // Fetch User Data from MongoDB
  const getUserData = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/get-user-data", {
        userId: user.id,
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  const value = {
    backendUrl,
    userData,
    setUserData,
    getUserData,
    movies,
    getMoviesData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
