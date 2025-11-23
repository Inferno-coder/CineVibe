import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Calendar, Lock, CheckCircle, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client/react";
import { BOOK_TICKET } from "../graphql/mutations";
import { useUser } from "@clerk/clerk-react";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useUser();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [bookTicket] = useMutation(BOOK_TICKET, {
    onCompleted: () => {
      toast.success("Booking Confirmed! 🎉", { duration: 5000 });
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(`Booking Failed: ${err.message}`);
      setIsProcessing(false);
    },
  });

  if (!state) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>No payment details found.</p>
      </div>
    );
  }

  const { theatreName, movieTitle, showTime, seats, totalAmount, showId, seatIds } = state;

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (cardNumber.length < 16 || expiry.length < 5 || cvv.length < 3) {
      toast.error("Please enter valid card details.");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Processing Payment...");

    // Simulate network delay
    setTimeout(() => {
      toast.dismiss(toastId);
      toast.success("Payment Verified! 💳");
      
      // Proceed with booking
      bookTicket({
        variables: {
          userId: null, // Let backend handle it via email or fallback
          email: user?.primaryEmailAddress?.emailAddress || "guest@cinevibe.com",
          showId: showId,
          seatIds: seatIds,
        },
      });
    }, 2000);
  };

  // Format Card Number
  const handleCardInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(value);
  };

  // Format Expiry
  const handleExpiryInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpiry(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-10 px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-yellow-300 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Cancel
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-300">Payment Details</h2>

        {/* Order Summary */}
        <div className="bg-black/20 rounded-xl p-4 mb-6 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Movie</span>
            <span className="font-semibold">{movieTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Theater</span>
            <span className="font-semibold">{theatreName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Seats</span>
            <span className="font-semibold">{seats.join(", ")}</span>
          </div>
          <div className="border-t border-white/10 pt-2 mt-2 flex justify-between text-lg font-bold text-yellow-300">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Card Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardInput}
                placeholder="0000 0000 0000 0000"
                className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-yellow-400 transition tracking-widest"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Expiry Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={expiry}
                  onChange={handleExpiryInput}
                  placeholder="MM/YY"
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">CVV</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="123"
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-yellow-400 transition tracking-widest"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full mt-6 py-3 rounded-xl font-bold text-black flex items-center justify-center gap-2 transition-all ${
              isProcessing 
                ? "bg-gray-500 cursor-not-allowed" 
                : "bg-yellow-400 hover:bg-yellow-300 hover:scale-[1.02] shadow-lg shadow-yellow-400/20"
            }`}
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                Pay ${totalAmount} <CheckCircle className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-500 mt-4">
          <Lock className="w-3 h-3 inline mr-1" />
          Secure Payment (Simulated for Demo)
        </p>
      </div>
    </div>
  );
}
