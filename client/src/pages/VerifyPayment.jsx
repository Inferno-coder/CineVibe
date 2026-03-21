import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { CheckCircle, XCircle } from 'lucide-react';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const sessionId = searchParams.get('sessionId');
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const verifyPayment = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/booking/verify-payment', {
        sessionId,
        success
      });

      if (data.success) {
        setIsSuccess(true);
        toast.success("Payment successful! Your seats are booked.");
      } else {
        setIsSuccess(false);
        toast.error(data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      toast.error("Error verifying payment");
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setIsVerifying(false);
      setIsSuccess(false);
    }
  }, [sessionId]);

  if (isVerifying) return <Loading />;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center space-y-6 animate-in fade-in zoom-in duration-500">
        {isSuccess ? (
          <>
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Booking Confirmed!</h1>
            <p className="text-gray-400">
              Your payment was processed successfully. You can find your tickets in the "My Bookings" section.
            </p>
            <button
              onClick={() => navigate('/my-bookings')}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              View My Bookings
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Payment Failed</h1>
            <p className="text-gray-400">
              Oops! Something went wrong with your payment or it was cancelled. Please try again.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition border border-white/10"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPayment;
