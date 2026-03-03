import React, { useState } from "react";
import toast from "react-hot-toast";
import { Upload, Film, Calendar, Clock, Globe } from "lucide-react";

const AddShows = () => {
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    overview: "",
    release_date: "",
    runtime: "",
    original_language: "en",
    genres: "",
    poster_path: "",
    backdrop_path: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.release_date || !formData.poster_path) {
      toast.error("Please fill in the required fields");
      return;
    }
    toast.success("Show added successfully!");
    setFormData({
      title: "",
      tagline: "",
      overview: "",
      release_date: "",
      runtime: "",
      original_language: "en",
      genres: "",
      poster_path: "",
      backdrop_path: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Show</h1>
        <p className="text-gray-400">
          Fill in the details to add a new movie or show to the catalog.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-8"
      >
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/10 pb-2">
            <Film className="text-red-500" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">
                Movie Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Inception"
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="e.g. Your mind is the scene of the crime"
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">
              Overview/Description
            </label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows="4"
              placeholder="Brief summary of the movie..."
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition resize-none"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Calendar size={16} /> Release Date *
              </label>
              <input
                type="date"
                name="release_date"
                value={formData.release_date}
                onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition color-scheme-dark"
                style={{ colorScheme: "dark" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Clock size={16} /> Runtime (mins)
              </label>
              <input
                type="number"
                name="runtime"
                value={formData.runtime}
                onChange={handleChange}
                placeholder="120"
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Globe size={16} /> Language
              </label>
              <select
                name="original_language"
                value={formData.original_language}
                onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">
              Genres (Comma separated)
            </label>
            <input
              type="text"
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              placeholder="Action, Sci-Fi, Thriller"
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
            />
          </div>
        </div>

        {/* Media */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/10 pb-2">
            <Upload className="text-red-500" /> Media URLs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">
                Poster URL *
              </label>
              <input
                type="url"
                name="poster_path"
                value={formData.poster_path}
                onChange={handleChange}
                placeholder="https://example.com/poster.jpg"
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">
                Backdrop URL
              </label>
              <input
                type="url"
                name="backdrop_path"
                value={formData.backdrop_path}
                onChange={handleChange}
                placeholder="https://example.com/backdrop.jpg"
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShows;
