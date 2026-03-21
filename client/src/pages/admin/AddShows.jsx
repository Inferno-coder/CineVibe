import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Film, Calendar, Clock, DollarSign, PlusCircle } from "lucide-react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const AddShows = () => {
  const { backendUrl } = useContext(AppContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    movie: "",
    time: "10:30 AM",
    date: "",
    showPrice: "",
  });

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/movie/list");
      if (data.success) {
        setMovies(data.movies);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const calculateShowDateTime = (date, time) => {
    // Basic conversion for "07:15 PM" to ISO timestamp
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    if (modifier === "PM" && hours !== "12") hours = parseInt(hours) + 12;
    if (modifier === "AM" && hours === "12") hours = "00";
    
    const isoString = `${date}T${hours.toString().padStart(2, "0")}:${minutes}:00`;
    return new Date(isoString).getTime();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.movie || !formData.date || !formData.time || !formData.showPrice) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const showDateTime = calculateShowDateTime(formData.date, formData.time);
      
      const { data } = await axios.post(backendUrl + "/api/show/add", {
        ...formData,
        showDateTime
      });

      if (data.success) {
        toast.success("Show added successfully!");
        setFormData({
          movie: "",
          time: "10:30 AM",
          date: "",
          showPrice: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Assign New Show</h1>
        <p className="text-gray-400">
          Schedule a movie showtime for the theater.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-8"
      >
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/10 pb-2">
            <PlusCircle className="text-red-500" /> Show Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                 <Film size={16} /> Select Movie *
              </label>
              <select
                name="movie"
                value={formData.movie}
                onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              >
                <option value="">-- Choose a Movie --</option>
                {movies.map((m) => (
                   <option key={m._id} value={m._id}>{m.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Calendar size={16} /> Show Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                style={{ colorScheme: "dark" }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Clock size={16} /> Show Time *
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              >
                <option value="10:30 AM">10:30 AM</option>
                <option value="01:45 PM">01:45 PM</option>
                <option value="04:30 PM">04:30 PM</option>
                <option value="07:15 PM">07:15 PM</option>
                <option value="10:00 PM">10:00 PM</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <DollarSign size={16} /> Ticket Price ($) *
              </label>
              <input
                type="number"
                name="showPrice"
                value={formData.showPrice}
                onChange={handleChange}
                placeholder="e.g. 15"
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-12 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Assign Show"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShows;
