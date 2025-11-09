import { Film, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-indigo-900 to-black text-gray-300 py-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 🎬 Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Film className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">
              Cine<span className="text-yellow-400">Vibe</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your one-stop destination to explore and book the best movies across
            Tamil Nadu. Experience the vibe of cinema like never before!
          </p>
        </div>

        {/* 🎟️ Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/my-bookings"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* 📍 Locations */}
        <div>
          <h3 className="text-white font-semibold mb-3">Top Locations</h3>
          <ul className="space-y-2 text-sm">
            <li>Chennai</li>
            <li>Coimbatore</li>
            <li>Madurai</li>
            <li>Salem</li>
            <li>Trichy</li>
          </ul>
        </div>

        {/* 🌐 Socials */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="hover:text-yellow-400 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* ⚡ Bottom Bar */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-yellow-400">CineVibe</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
