import React, { useContext, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";

const ListBookings = () => {
  const { backendUrl } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/booking/list");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      // Note: Implement /api/booking/delete if not exists, but for now we follow the flow
      const { data } = await axios.post(backendUrl + "/api/booking/delete", { bookingId: id });
      if (data.success) {
        toast.success("Booking cancelled successfully");
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error cancelling booking");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">All Bookings</h1>
        <p className="text-gray-400">
          View and manage all user movie bookings.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10 text-sm uppercase tracking-wider text-gray-400 border-b border-white/10">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Movie</th>
                <th className="p-4 font-medium hidden lg:table-cell">
                  Show Details
                </th>
                <th className="p-4 font-medium text-center">Seats</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {bookings.map((booking) => {
                const show = booking.showId;
                const movie = booking.movieId || show?.movie;
                const userObj = booking.userId;

                return (
                  <tr key={booking._id} className="hover:bg-white/5 transition">
                    <td className="p-4 min-w-[150px]">
                      <div className="flex flex-col">
                        <span className="font-semibold">{userObj?.name || "Unknown User"}</span>
                        <span className="text-xs text-gray-500">{userObj?.email}</span>
                      </div>
                    </td>
                    <td className="p-4 flex items-center gap-3 min-w-[200px]">
                      {movie?.poster_path && (
                        <img
                          src={movie.poster_path}
                          alt={movie.title}
                          className="w-10 h-10 rounded-lg object-cover shadow-sm hidden sm:block"
                        />
                      )}
                      <span className="font-medium line-clamp-1">
                        {movie?.title || "Movie Deleted"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 min-w-[150px] hidden lg:table-cell">
                      <div className="flex flex-col">
                        <span>{show?.date || "N/A"}</span>
                        <span className="text-xs text-gray-400">{show?.time}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1 max-w-[100px] mx-auto">
                        {(booking.selectedSeats || []).map(seat => (
                          <span key={seat} className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono">
                            {seat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-red-500 font-bold">
                      ${booking.amount}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${booking.status === "Confirmed" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition"
                          title="Cancel Booking"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400">
                    No bookings found.
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

export default ListBookings;
