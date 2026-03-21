import React, { useState, useEffect, useContext } from "react";
import { Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const ListShows = () => {
  const { backendUrl } = useContext(AppContext);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShows = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/show/list");
      if (data.success) {
        setShows(data.shows);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching shows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, [backendUrl]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/show/delete", { id });
      if (data.success) {
        toast.success(data.message);
        fetchShows();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting show");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-gray-400">
        <div className="animate-pulse">Loading Shows...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">All Shows</h1>
        <p className="text-gray-400">
          Manage all movies and shows available in the application.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10 text-sm uppercase tracking-wider text-gray-400 border-b border-white/10">
                <th className="p-4 font-medium">Movie</th>
                <th className="p-4 font-medium hidden md:table-cell">Show Date & Time</th>
                <th className="p-4 font-medium hidden sm:table-cell">
                  Price
                </th>
                <th className="p-4 font-medium">Occupancy</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {shows.map((show) => {
                const dateObj = new Date(show.date);
                const occupiedCount = Object.keys(show.occupiedSeats || {}).length;

                return (
                  <tr key={show._id} className="hover:bg-white/5 transition text-gray-300">
                    <td className="p-4 flex items-center gap-4 min-w-[250px]">
                      <img
                        src={show.movie.poster_path}
                        alt={show.movie.title}
                        className="w-12 h-16 rounded-lg object-cover shadow-lg"
                      />
                      <div>
                        <span className="font-bold text-base line-clamp-1 text-white">
                          {show.movie.title}
                        </span>
                        <span className="text-xs text-gray-400 block mt-1">
                          {show.movie.runtime} mins • {show.movie.genres.map(g => g.name).slice(0, 2).join(", ")}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">
                          {dateObj.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-xs text-gray-500">{show.time}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-white font-bold">
                      ${show.showPrice}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-red-600 h-full rounded-full" 
                            style={{ width: `${Math.min((occupiedCount / 120) * 100, 100)}%` }} 
                          />
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {occupiedCount} / 120
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleDelete(show._id)}
                          className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {shows.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-16 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                       <span className="text-4xl">🎬</span>
                       <p className="text-lg">No shows available.</p>
                       <p className="text-sm">Add a show from the "Add Shows" tab to get started.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListShows;
