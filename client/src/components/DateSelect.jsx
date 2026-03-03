import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const dates = Object.keys(dateTime);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const onbookHandler = () => {
    if (!selectedDate) {
      return toast.error("Please select a date");
    }
    navigate(`/movie/${id}/${selectedDate}`);
    window.scrollTo(0, 0);
  };
  return (
    <div
      id="dateSelect"
      className="relative mt-12 rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <div>
          <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">
            Choose Date
          </p>

          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button className="rounded-full bg-white/10 p-2 transition hover:bg-white/20">
              <ChevronLeftIcon width={22} />
            </button>

            {/* Dates */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {dates.map((date) => {
                const isActive = selectedDate === date;

                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex min-w-[64px] flex-col items-center justify-center rounded-xl px-4 py-3 transition
                      ${
                        isActive
                          ? "bg-red-600 text-white shadow-lg"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                  >
                    <span className="text-lg font-semibold">
                      {new Date(date).getDate()}
                    </span>
                    <span className="text-xs uppercase tracking-wide">
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Arrow */}
            <button className="rounded-full bg-white/10 p-2 transition hover:bg-white/20">
              <ChevronRightIcon width={22} />
            </button>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onbookHandler}
          className="rounded-xl bg-red-600 px-10 py-4 font-semibold text-white transition hover:bg-red-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
