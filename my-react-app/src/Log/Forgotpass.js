import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as API from "../User/Endpoints/Endpoints";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your e-mail");
    } else {
      try {
        const response = await fetch(API.RESET_PASSWORD_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Password reset link sent to your email");
          navigate("/login");
        } else {
          toast.error("Request failed: " + data.message);
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <p className="text-center mb-6 text-gray-600">
          Forgot your password? No worries! Reset it now to regain access to your account and continue exploring our platform's personalized services.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Link
          </button>
        </form>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Can't remember your password?
          </h2>
          <p className="text-gray-600">
            Let’s get you back on track! Reset your password now to quickly restore access to your account and enjoy all the personalized services our platform has to offer.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
