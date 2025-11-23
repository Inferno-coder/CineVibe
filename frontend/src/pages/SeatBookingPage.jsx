import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Armchair, ArrowLeft, CheckCircle } from "lucide-react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_SHOW } from "../graphql/queries";
import { BOOK_TICKET } from "../graphql/mutations";
import { useUser } from "@clerk/clerk-react";

export default function SeatBookingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useUser();

  // ✅ Hooks declared before any early return
  const [selectedShowtime, setSelectedShowtime] = useState(
    state?.timings?.[0] || null
  );
  const [selectedSeats, setSelectedSeats] = useState([]);

  const { loading, error, data, refetch } = useQuery(GET_SHOW, {
    variables: { id: selectedShowtime?.id },
    skip: !selectedShowtime,
  });



  // ✅ Safe early return after hooks
  if (!state) {
    return (
      <div className="text-center text-gray-300 py-20">
        No booking details found.
      </div>
    );
  }

  const { theatreName, movieTitle, image, timings } = state;

  // Use fetched seats or fallback to empty array
  const seats = data?.show?.screen?.seats || [];

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;
    setSelectedSeats((prev) =>
      prev.some((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const handleBookingConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    if (!user) {
      alert("Please sign in to book tickets!");
      return;
    }

    // Calculate total amount (assuming $10 per seat for now)
    const totalAmount = selectedSeats.length * 10;

    navigate("/payment", {
      state: {
        theatreName,
        movieTitle,
        showTime: selectedShowtime.time,
        seats: selectedSeats.map(s => `${s.row}${s.number}`),
        totalAmount,
        showId: selectedShowtime.id,
        seatIds: selectedSeats.map((s) => s.id),
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-10 px-6">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-300 hover:text-yellow-300 mb-8 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </button>

      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
        {/* 🎬 Movie Info Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            src={image}
            alt={movieTitle}
            className="w-40 h-56 object-cover rounded-lg shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-yellow-300">{movieTitle}</h1>
            <p className="text-gray-300 text-sm mt-2">🎭 {theatreName}</p>

            {/* 🕒 Showtimes */}
            <div className="mt-4 flex flex-wrap gap-2">
              {timings.map((show) => (
                <button
                  key={show.id}
                  onClick={() => setSelectedShowtime(show)}
                  className={`px-3 py-1 text-sm rounded-md border transition-all duration-200 ${
                    selectedShowtime?.id === show.id
                      ? "bg-yellow-400 text-black border-yellow-400 font-semibold"
                      : "border-yellow-300 text-yellow-300 hover:bg-yellow-400 hover:text-black"
                  }`}
                >
                  {show.time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 🪑 Seat Selection Section */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-yellow-300">
            Select Your Seats
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            (Click to select or deselect)
          </p>
        </div>

        {/* 💺 Seat Grid */}
        {loading ? (
          <div className="text-center py-10">Loading seats...</div>
        ) : (
          <div className="grid grid-cols-8 gap-3 justify-items-center mb-8">
            {seats.map((seat) => {
              const isSelected = selectedSeats.some((s) => s.id === seat.id);
              const isBooked = seat.isBooked;
              
              return (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat)}
                  disabled={isBooked}
                  className={`p-3 rounded-lg transition-all ${
                    isBooked
                      ? "bg-gray-600 cursor-not-allowed"
                      : isSelected
                      ? "bg-yellow-400 text-black scale-110"
                      : "bg-white/10 hover:bg-yellow-300/40 text-white"
                  }`}
                  title={isBooked ? "Booked" : `Row ${seat.row} Seat ${seat.number}`}
                >
                  <Armchair className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        )}

        {/* 🧭 Seat Legend */}
        <div className="flex justify-center gap-8 text-sm mb-8 text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-white/20" /> Available
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-yellow-400" /> Selected
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gray-600" /> Booked
          </div>
        </div>

        {/* 🧾 Summary Section */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center text-gray-300 mb-6">
          <p className="mb-2">
            🎬{" "}
            <span className="text-yellow-300 font-semibold">{movieTitle}</span>
          </p>
          <p className="mb-2">
            🎭 <span className="text-yellow-300">{theatreName}</span>
          </p>
          <p className="mb-2">
            ⏰ Showtime:{" "}
            <span className="text-yellow-300 font-medium">
              {selectedShowtime?.time}
            </span>
          </p>
          <p>
            💺 Seats:{" "}
            <span className="text-yellow-300 font-medium">
              {selectedSeats.length > 0 ? selectedSeats.map(s => s.number).join(", ") : "None"}
            </span>
          </p>
        </div>

        {/* ✅ Confirm Button */}
        <div className="text-center">
          <button
            onClick={handleBookingConfirm}
            className="flex items-center justify-center mx-auto gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all"
          >
            <CheckCircle className="w-5 h-5" />
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
