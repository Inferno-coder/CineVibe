import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Film } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-black via-gray-900 to-black text-gray-300">
      {/* Top Glow Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-white">
              <Film className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold tracking-wide">CineVibe</span>
            </div>
            <p className="text-sm text-gray-400">
              Discover movies, watch trailers, and book tickets for the latest
              blockbusters — all in one place.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                Now Showing
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Upcoming
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Trailers
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Top Rated
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a className="rounded-full bg-white/10 p-2 hover:bg-red-600 transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a className="rounded-full bg-white/10 p-2 hover:bg-red-600 transition">
                <Twitter className="h-4 w-4" />
              </a>
              <a className="rounded-full bg-white/10 p-2 hover:bg-red-600 transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a className="rounded-full bg-white/10 p-2 hover:bg-red-600 transition">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} CineVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
