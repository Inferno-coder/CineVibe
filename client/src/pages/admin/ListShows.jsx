import React, { useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import { Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";

const ListShows = () => {
  const [shows, setShows] = useState(dummyShowsData);

  const handleDelete = (id) => {
    setShows(shows.filter((show) => show._id !== id));
    toast.success("Show deleted successfully");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">All Shows</h1>
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
                <th className="p-4 font-medium hidden md:table-cell">Genres</th>
                <th className="p-4 font-medium hidden sm:table-cell">
                  Release Date
                </th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {shows.map((show) => {
                const dateObj = new Date(show.release_date);
                return (
                  <tr key={show._id} className="hover:bg-white/5 transition">
                    <td className="p-4 flex items-center gap-4 min-w-[250px]">
                      <img
                        src={show.poster_path}
                        alt={show.title}
                        className="w-12 h-16 rounded-lg object-cover shadow-lg"
                      />
                      <div>
                        <span className="font-bold text-base line-clamp-1">
                          {show.title}
                        </span>
                        <span className="text-xs text-gray-400 block mt-1">
                          {show.runtime} mins
                        </span>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {show.genres.map((g) => (
                          <span
                            key={g.id}
                            className="text-[10px] bg-white/10 px-2 py-1 rounded-md"
                          >
                            {g.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-gray-300 whitespace-nowrap">
                      {dateObj.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                        ★ {show.vote_average.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
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
                  <td colSpan="5" className="p-8 text-center text-gray-400">
                    No shows available.
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
