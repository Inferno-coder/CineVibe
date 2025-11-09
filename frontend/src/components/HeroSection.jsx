import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative h-[80vh] flex items-center justify-start bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpgp",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 px-12 max-w-2xl">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold leading-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Experience the Epic
          <br />
          <span className="text-yellow-400">Dune: Part Two</span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Witness the rise of a legend. Feel the power of the desert in IMAX.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all shadow-md">
            🎟️ Book Now
          </button>
          <button className="flex items-center gap-2 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all">
            <Info className="w-5 h-5" /> View Details
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
