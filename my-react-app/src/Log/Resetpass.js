import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import * as API from "../../src/User/Endpoints/Endpoints";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null);
  const [userId, setUserId] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.post(API.VALIDATE_TOKEN_API, { token });

        if (response.data.valid) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.regid);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill all the fields");
    } else {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      try {
        const response = await fetch(API.UPDATE_PASSWORD_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ regid: userId, password }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Password Update successful! Please log in.");
          navigate("/login");
        } else {
          toast.error("Update failed: " + data.message);
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      }
    }
  };

  if (isValid === null) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isValid) {
    return <div className="text-center mt-10 text-red-500">Invalid or expired reset link.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <p className="text-center mb-6 text-gray-600">
          Reset your password and regain access to all the personalized services and features our platform has to offer.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Password
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login">
            <button className="text-blue-500 hover:text-blue-700">Back to Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
