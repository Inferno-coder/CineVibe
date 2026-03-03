import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight, Calendar, ClockIcon, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-[90vh] w-full bg-cover bg-center flex items-end"
      style={{ backgroundImage: 'url("/backgroundImage.png")' }}
    >
      {/* Content */}
      <div className="relative z-10 px-20 pb-28 max-w-3xl text-white">
        {/* Logo */}
        <img
          src={assets.marvelLogo}
          alt="Marvel"
          className="w-32 mb-6 drop-shadow-lg"
        />

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide drop-shadow-xl">
          Guardians <br />
          <span className="text-red-500">of the Galaxy</span>
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-200">
          <span className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md">
            Action • Adventure • Sci-Fi
          </span>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>2018</span>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon size={16} />
            <span>2h 8m</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4 mt-10" onClick={() => navigate("/movies")}>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg font-semibold shadow-lg">
            Explore Movies
            <ArrowRight size={18} />
          </button>

          <button className="border border-white/30 hover:bg-white/10 transition px-6 py-3 rounded-lg font-semibold backdrop-blur-md">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
