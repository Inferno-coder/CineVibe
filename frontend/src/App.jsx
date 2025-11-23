import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Film, Ticket, Home, LogIn, User, MapPin } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "./slicers/locationSlice";

import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import { LOCATIONS } from "./assets/district";
import SeatBookingPage from "./pages/SeatBookingPage";

import { Toaster } from "react-hot-toast";
import PaymentPage from "./pages/PaymentPage";

export default function App() {
  const { user, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      {/* 🌈 Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg relative">
        {/* 🎬 Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide"
        >
          <Film className="w-7 h-7 text-yellow-300" />
          Cine<span className="text-yellow-300">Vibe</span>
        </Link>

        {/* 🌆 Navigation */}
        <nav className="flex items-center gap-6">
          {/* 📍 Location Dropdown */}
          <div className="relative group">
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <MapPin className="text-yellow-300 w-5 h-5" />
              <span className="font-semibold text-sm group-hover:text-yellow-300 transition">
                {selectedLocation}
              </span>
              <svg
                className={`w-4 h-4 text-yellow-300 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* ✨ Scrollable Glassmorphic Dropdown (with invisible scroll) */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 max-h-60 overflow-y-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg z-50 thin-scroll hover:scroll-visible">
                {Object.values(LOCATIONS).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      dispatch(setLocation(loc)); // ✅ Redux update
                      setShowDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedLocation === loc
                        ? "bg-yellow-300 text-black font-semibold"
                        : "text-white hover:bg-white/20"
                    } transition`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🔗 Navigation Links */}
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link
            to="/movies"
            className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
          >
            <Ticket className="w-5 h-5" /> Theatres
          </Link>
          <Link
            to="/my-bookings"
            className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
          >
            <User className="w-5 h-5" /> My Bookings
          </Link>

          {/* 👤 Authentication Section */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition">
                <LogIn className="w-4 h-4" /> Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-3">
              <span className="font-semibold">{user?.firstName}</span>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </SignedIn>
        </nav>
      </header>

      {/* 🧭 Main Routes */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route
            path="/my-bookings"
            element={
              isSignedIn ? <MyBookingsPage /> : <Navigate to="/" replace />
            }
          />
          <Route path="/booking" element={<SeatBookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}
