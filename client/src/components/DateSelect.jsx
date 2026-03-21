import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ shows, id }) => {
  const navigate = useNavigate();

  // Group shows by date
  const groupedShows = shows.reduce((acc, show) => {
    if (!acc[show.date]) acc[show.date] = [];
    acc[show.date].push(show);
    return acc;
  }, {});

  const dates = Object.keys(groupedShows).sort();
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedShow, setSelectedShow] = useState(groupedShows[dates[0]]?.[0]);

  const onbookHandler = () => {
    if (!selectedShow) {
      return toast.error("Please select a showtime");
    }
    navigate(`/book/${selectedShow._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      id="dateSelect"
      className="relative mt-12 rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10"
    >
      <div className="flex flex-col gap-10">
        {/* Date Selection */}
        <div>
          <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">
            Choose Date
          </p>
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-white/10 p-2 transition hover:bg-white/20">
              <ChevronLeftIcon width={22} />
            </button>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
              {dates.map((date) => {
                const isActive = selectedDate === date;
                return (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedShow(groupedShows[date][0]);
                    }}
                    className={`flex min-w-[70px] flex-col items-center justify-center rounded-xl px-4 py-3 transition
                      ${
                        isActive
                          ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                  >
                    <span className="text-xl font-bold">
                      {new Date(date).getDate()}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-tighter opacity-70">
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </button>
                );
              })}
            </div>
            <button className="rounded-full bg-white/10 p-2 transition hover:bg-white/20">
              <ChevronRightIcon width={22} />
            </button>
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">
              Select Showtime
            </p>
            <div className="flex flex-wrap gap-4">
              {groupedShows[selectedDate].map((show) => {
                const isActive = selectedShow?._id === show._id;
                return (
                  <button
                    key={show._id}
                    onClick={() => setSelectedShow(show)}
                    className={`px-6 py-3 rounded-xl border transition-all ${
                      isActive
                        ? "bg-red-600 border-red-500 text-white shadow-lg"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-semibold">{show.time}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-4">
          <div className="hidden md:block">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Price per seat</p>
            <p className="text-2xl font-black text-white">${selectedShow?.showPrice || 0}</p>
          </div>
          <button
            onClick={onbookHandler}
            className="w-full md:w-auto rounded-xl bg-red-600 px-16 py-4 font-bold text-white transition-all hover:bg-red-700 active:scale-95 shadow-xl"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
