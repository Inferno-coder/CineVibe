import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import { ChevronLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const { showId } = useParams();
  const { backendUrl } = useContext(AppContext);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchShowData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/show/" + showId);
      if (data.success) {
        setShow(data.show);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading show data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowData();
  }, [showId, backendUrl]);

  // Seat Configuration
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Real occupied seats from show object
  const occupiedSeats = show ? Object.keys(show.occupiedSeats) : [];

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      if (selectedSeats.length >= 10) {
        toast.error("You can select up to 10 seats max.");
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.");
      return;
    }
    toast.success("Proceeding to payment...");
    // Future: navigate to payment page with showId and selectedSeats
    navigate("/my-bookings");
  };

  if (loading) return <Loading />;
  if (!show) return <div className="min-h-screen flex items-center justify-center text-white">Show not found</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 pb-32 pt-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition backdrop-blur-md border border-white/10"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {show.movie.title}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              • {show.movie.genres.map((g) => g.name).join(", ")}
            </p>
          </div>
        </div>

        {/* Available timings */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 max-w-full md:max-w-md">
          {show.dataTime[date]?.map((timeObj, index) => {
            const timeDate = new Date(timeObj.time);
            const timeString = timeDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const isSelected = selectedTime === timeObj.time;

            return (
              <button
                key={index}
                onClick={() => setSelectedTime(timeObj.time)}
                className={`min-w-max px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-gray-200 hover:bg-white/10"
                }`}
              >
                {timeString}
              </button>
            );
          })}
        </div>
      </div>

      {/* Screen Layout */}
      <div className="relative z-10 mt-12 max-w-5xl mx-auto flex flex-col items-center">
        {/* Screen curved line */}
        <div className="w-full md:w-[80%] h-12 border-t-[6px] border-red-500/50 rounded-t-[50%] blur-[2px] mb-2" />
        <div className="w-[85%] md:w-[70%] h-6 border-t-4 border-red-500 rounded-t-[50%] shadow-[0_-15px_40px_rgba(220,38,38,0.4)] mb-14" />
        <p className="text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-12">
          Screen This Way
        </p>

        {/* Seat Layout */}
        <div className="flex flex-col gap-3 md:gap-4 items-center w-full overflow-x-auto scrollbar-hide pb-8">
          {rows.map((row) => (
            <div
              key={row}
              className="flex gap-2 md:gap-3 items-center justify-center min-w-max px-4"
            >
              <span className="w-6 text-center text-xs md:text-sm font-semibold text-gray-500 mr-2 md:mr-6">
                {row}
              </span>

              <div className="flex gap-2.5 md:gap-3">
                {cols.map((col) => {
                  const seatId = `${row}${col}`;
                  const isOccupied = occupiedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  let seatClass =
                    "bg-white/5 border-white/10 hover:bg-white/20 hover:border-white/30"; // default available
                  if (isOccupied)
                    seatClass =
                      "bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed";
                  if (isSelected)
                    seatClass =
                      "bg-red-600 border-red-400 shadow-[0_0_12px_rgba(220,38,38,0.6)]";

                  // Add gap for the aisle
                  const isAisle = col === 6;

                  return (
                    <button
                      key={seatId}
                      disabled={isOccupied}
                      onClick={() => handleSeatClick(seatId)}
                      className={`relative w-7 h-7 md:w-9 md:h-9 rounded-t-xl rounded-b-sm border transition-all duration-300 ${seatClass} ${isAisle ? "mr-6 md:mr-10" : ""}`}
                    >
                      <span className="text-[10px] md:text-xs font-semibold absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        {col}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-12 bg-white/5 px-8 py-4 rounded-full backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-t-lg rounded-b-sm bg-white/10 border border-white/20"></div>
            <span className="text-sm font-medium text-gray-300">Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-t-lg rounded-b-sm bg-red-600 border border-red-500 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
            <span className="text-sm font-medium text-white">Selected</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-t-lg rounded-b-sm bg-zinc-800 border border-zinc-700"></div>
            <span className="text-sm font-medium text-gray-500">Occupied</span>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-6 z-50 transform transition-transform duration-300 translate-y-0">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-400 mb-1">
                  {selectedSeats.length}{" "}
                  {selectedSeats.length === 1 ? "Seat" : "Seats"} Selected
                </p>
                <p className="text-sm font-medium text-white max-w-[200px] truncate">
                  {selectedSeats.join(", ")}
                </p>
              </div>
              <div className="flex flex-col text-right md:text-left">
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Total Price
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">
                    ${selectedSeats.length * ticketPrice}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="w-full md:w-auto px-12 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg hover:from-red-500 hover:to-red-600 shadow-[0_4px_25px_rgba(220,38,38,0.5)] transition-all hover:scale-[1.02] active:scale-95"
            >
              Book Tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;
