import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@apollo/client/react";
import { GET_USER_BOOKINGS } from "../graphql/queries";
import { Loader2, Ticket, Calendar, MapPin, Armchair } from "lucide-react";
import { format } from "date-fns";

const MyBookingsPage = () => {
  const { user, isSignedIn } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const { loading, error, data } = useQuery(GET_USER_BOOKINGS, {
    variables: { email },
    skip: !email,
  });

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl">Please sign in to view your bookings.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-red-400">Error loading bookings: {error.message}</p>
      </div>
    );
  }

  const bookings = data?.userByEmail?.bookings || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3 text-yellow-400">
          <Ticket className="w-10 h-10" /> My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <p className="text-2xl text-gray-400 mb-4">No bookings found</p>
            <p className="text-gray-500">
              Looks like you haven't booked any movies yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                {/* Movie Header */}
                <div className="relative h-48">
                  <img
                    src={
                      booking.show.movie.posterUrl ||
                      "https://via.placeholder.com/400x200"
                    }
                    alt={booking.show.movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-1 truncate">
                      {booking.show.movie.title}
                    </h2>
                    <p className="text-yellow-400 text-sm font-medium">
                      {booking.show.movie.duration} mins
                    </p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">
                        {format(
new Date(Number(booking.show.startTime)),
                          "MMM d, yyyy"
                        )}
                      </p>
                      <p className="text-sm">
                        {format(new Date(Number(booking.show.startTime)), "h:mm a")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">
                        {booking.show.screen.theater.name}
                      </p>
                      <p className="text-sm">
                        {booking.show.screen.theater.location} • Screen{" "}
                        {booking.show.screen.number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-gray-300">
                    <Armchair className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1">Seats</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.seats.map((seat, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-indigo-600/30 border border-indigo-500/30 rounded text-xs font-medium text-indigo-200"
                          >
                            {seat.row}
                            {seat.number}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">Total Amount</p>
                      <p className="text-xl font-bold text-green-400">
                        ₹{booking.totalAmount}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : booking.status === "PENDING"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {booking.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
