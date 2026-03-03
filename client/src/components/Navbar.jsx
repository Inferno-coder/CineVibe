import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, TicketPlus, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="select-none">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-wide">
            CineVibe
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Movies", "Theatres", "Releases", "Favorite"].map(
            (item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => {
                  scrollTo(0, 0);
                  setOpen(false);
                }}
                className="text-gray-300 hover:text-white transition relative group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all group-hover:w-full"></span>
              </Link>
            ),
          )}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <Search className="text-gray-300 hover:text-white cursor-pointer transition" />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-lg shadow-red-600/30 cursor-pointer">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-red-500",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TicketPlus width={15} />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl px-6 py-6 space-y-4 border-t border-white/10">
          {["Home", "Movies", "Theatres", "Releases", "Favorite"].map(
            (item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-white text-lg transition"
                onClick={() => setOpen(false)}
              >
                {item}
              </Link>
            ),
          )}

          <div className="flex items-center gap-4 pt-4">
            <Search className="text-gray-300" />
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center w-full">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-red-500",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
