import React, { useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const ListBookings = () => {
  const [bookings, setBookings] = useState(dummyBookingData);

  const handleDelete = (id) => {
    // Note: Since dummyData has duplicated _id for bookings, this will delete all dummy duplicates, simulating a DB deletion
    setBookings(bookings.filter((b) => b._id !== id));
    toast.success("Booking cancelled successfully");
  };

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
                  Show Time
                </th>
                <th className="p-4 font-medium text-center">Seats</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {bookings.map((booking, index) => {
                const dateObj = new Date(booking.show.showDateTime);
                // Creating a unique key since dummyBookingData has duplicate _id
                const uniqueKey = `${booking._id}-${index}`;

                return (
                  <tr key={uniqueKey} className="hover:bg-white/5 transition">
                    <td className="p-4 min-w-[150px]">
                      <span className="font-semibold">{booking.user.name}</span>
                    </td>
                    <td className="p-4 flex items-center gap-3 min-w-[200px]">
                      <img
                        src={booking.show.movie.poster_path}
                        alt={booking.show.movie.title}
                        className="w-10 h-10 rounded-lg object-cover shadow-sm hidden sm:block"
                      />
                      <span className="font-medium line-clamp-1">
                        {booking.show.movie.title}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 min-w-[150px] hidden lg:table-cell">
                      <div className="flex flex-col">
                        <span>
                          {dateObj.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-xs text-gray-400">
                          {dateObj.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs font-mono">
                        {booking.bookedSeats.length}
                      </span>
                    </td>
                    <td className="p-4 text-red-500 font-bold">
                      ${booking.amount}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${booking.isPaid ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
                      >
                        {booking.isPaid ? "Paid" : "Pending"}
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
