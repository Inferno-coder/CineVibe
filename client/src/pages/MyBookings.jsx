import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import { CalendarIcon, ClockIcon, TicketIcon } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = () => {
    // Artificial delay to show loading state
    setTimeout(() => {
      setBookings(dummyBookingData);
      setIsLoading(false);
    }, 600);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 md:px-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-400 mb-10">
          Manage and view all your upcoming and past movie tickets.
        </p>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 mt-10 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md">
            <TicketIcon className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Bookings Found</h2>
            <p className="text-gray-400">You haven't booked any tickets yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {bookings.map((booking, index) => {
              const movieDate = new Date(booking.show.showDateTime);
              const dateString = movieDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              const timeString = movieDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={index}
                  className="relative group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Ticket notch top & bottom */}
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-black rounded-full border-r border-white/10 z-20"></div>
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-black rounded-full border-l border-white/10 z-20"></div>

                  <div className="flex flex-col sm:flex-row h-full pl-3 pr-3 sm:px-0">
                    {/* Poster Section */}
                    <div className="w-full sm:w-40 shrink-0 relative mt-3 sm:mt-0 rounded-2xl sm:rounded-none sm:rounded-l-3xl overflow-hidden">
                      <img
                        src={booking.show.movie.poster_path}
                        alt={booking.show.movie.title}
                        className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Paid Status Pill on top of image for mobile */}
                      <div className="absolute top-3 left-3 sm:hidden">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${booking.isPaid ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}`}
                        >
                          {booking.isPaid ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-6 flex flex-col justify-between w-full relative">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold line-clamp-1 pr-2">
                            {booking.show.movie.title}
                          </h3>
                          {/* Paid Status Pill on top right for desktop */}
                          <div className="hidden sm:block shrink-0">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${booking.isPaid ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
                            >
                              {booking.isPaid ? "Paid" : "Pending"}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">
                          {booking.show.movie.genres
                            .map((g) => g.name)
                            .join(", ")}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-300 gap-2">
                            <CalendarIcon className="w-4 h-4 text-red-500" />
                            <span>{dateString}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-300 gap-2">
                            <ClockIcon className="w-4 h-4 text-red-500" />
                            <span>{timeString}</span>
                          </div>
                        </div>
                      </div>

                      {/* Divider line (dashed like a ticket) */}
                      <div className="w-full border-t-2 border-dashed border-white/10 my-4"></div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                            Seats ({booking.bookedSeats.length})
                          </p>
                          <p className="font-semibold text-sm">
                            {booking.bookedSeats.join(", ")}
                          </p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <div>
                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                              Total
                            </p>
                            <p className="font-bold text-lg text-red-500">
                              ${booking.amount}
                            </p>
                          </div>
                          {!booking.isPaid && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add payment handler logic here
                                alert("Redirecting to payment...");
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1.5 px-4 rounded-lg shadow-md transition-all hover:scale-105"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
