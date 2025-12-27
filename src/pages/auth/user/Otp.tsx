import React, { useState, useRef, useEffect } from "react";
import { Heart, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { type AppDispatch } from "../../../store";
import { useAppSelector } from "../../../store/hooks";
import {
  resendOtpThunk,
  verifyOtpThunk,
} from "../../../store/slice/Auth/auth.thunks";

const OTP_LENGTH = 6;
const OTP_DURATION = 60;
const OTP_TIMER_KEY = "otp_timer_expires_at";

export default function OTPVerification() {
  const { email, error, isAuthenticated, userId } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState<number>(() => {
    const expiry = localStorage.getItem(OTP_TIMER_KEY);
    if (!expiry) return OTP_DURATION;

    const remaining = Math.ceil((Number(expiry) - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const canResend = timer === 0;

  /* ----------------------- Effects ----------------------- */

  // Initialize timer on mount
  useEffect(() => {
    if (!localStorage.getItem(OTP_TIMER_KEY)) {
      localStorage.setItem(
        OTP_TIMER_KEY,
        (Date.now() + OTP_DURATION * 1000).toString()
      );
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Redirect after successful verification
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  /* ----------------------- Handlers ----------------------- */

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    setOtp((prev) => {
      const next = [...prev];
      digits.forEach((d, i) => (next[i] = d));
      return next;
    });
  };

  const handleResend = async () => {
    if (!email) return;

    localStorage.setItem(
      OTP_TIMER_KEY,
      (Date.now() + OTP_DURATION * 1000).toString()
    );

    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(OTP_DURATION);
    inputRefs.current[0]?.focus();

    await dispatch(resendOtpThunk(email));
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== OTP_LENGTH || !email) return;
    console.log("This is verify-otp route", otpValue);

    localStorage.removeItem(OTP_TIMER_KEY);

    await dispatch(
      verifyOtpThunk({
        email,
        otp: otpValue,
        userId: userId as string,
      })
    );
  };

  /* ----------------------- UI ----------------------- */

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
      <div className="flex justify-center mb-6">
        <div className="bg-blue-500 rounded-2xl p-4">
          <Heart className="w-8 h-8 text-white" fill="white" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        Verify Your Account
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Enter the 6-digit code sent to your email
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-8 flex items-center gap-3">
        <Mail className="w-5 h-5 text-blue-500" />
        <span className="text-sm text-gray-700">
          {email && (
            <span>
              Code sent to <strong>{email}</strong>
            </span>
          )}
        </span>
      </div>

      {error && (
        <p className="text-red-500 text-1xl text-center mt-4">{error}</p>
      )}

      {/* OTP Input */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Enter OTP Code
        </label>
        <div className="flex gap-3 justify-center" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          ))}
        </div>
      </div>

      {/* Timer / Resend */}
      <div className="text-center mb-8">
        {!canResend ? (
          <p className="text-gray-600 text-sm">
            Resend code in{" "}
            <span className="font-semibold text-blue-500">{timer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-blue-500 font-semibold text-sm hover:underline"
          >
            Resend Code
          </button>
        )}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={otp.join("").length !== OTP_LENGTH}
        className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
      >
        Verify Account
      </button>

      {/* Back */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Wrong email?{" "}
        <Link to="/" className="text-blue-500 font-semibold hover:underline">
          Go Back
        </Link>
      </p>
    </div>
  );
}
