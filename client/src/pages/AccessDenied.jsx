import React from "react";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurColor from "../components/BlurColor";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden px-6">
      {/* Background Ambience */}
      <BlurColor top="20%" left="10%" size={400} />
      <BlurColor bottom="10%" right="-10%" size={500} />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Icon Container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-2xl shadow-2xl">
              <ShieldAlert size={64} className="text-red-500" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-2xl">
          ACCESS <span className="text-red-600">DENIED</span>
        </h1>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
          Oops! It looks like you've wandered into a restricted area. 
          This section is reserved for our administrative crew only.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold backdrop-blur-md active:scale-95"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 transition-all font-bold shadow-xl shadow-red-900/20 active:scale-95"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>

        {/* Decorative Quote */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-600 font-bold">
            CineVibe Security Protocol System v2.0
          </p>
        </div>
      </div>

      {/* Grid Overlay for Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />
    </div>
  );
};

export default AccessDenied;
