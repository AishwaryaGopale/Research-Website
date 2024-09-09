import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as API from "../User/Endpoints/Endpoints";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // State to store the OTP
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      toast.error("Please enter your e-mail and OTP");
    } else {
      try {
        const response = await fetch(API.VERIFY_OTP_API, {
          // Update to your OTP verification endpoint
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }), // Send both email and OTP
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("OTP verified successfully. You can now log in.");
          navigate("/login"); // Navigate to login page upon successful verification
        } else {
          toast.error("OTP verification failed: " + data.message);
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl flex">
        <div className="w-full lg:w-1/2 p-6">
          <p className="text-center text-gray-600 mb-6">
            Verify your email by entering the OTP sent to your email address to activate your account and continue exploring our platform.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
                type="submit"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
        <div className="hidden lg:block lg:w-1/2 bg-blue-600 text-white p-8 rounded-r-lg">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-6">
              Enter your OTP to verify your account
            </h2>
            <p>
              Check your email for the OTP, enter it here to verify your account, and start using all the features we offer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
