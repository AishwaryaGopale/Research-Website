import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from './loginimg.png'; // Updated import statement for the image
import * as API from "../User/Endpoints/Endpoints";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API.LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Check if the user is verified
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem('isAdmin', data.isAdmin); // Save admin status
          if (data.isAdmin) {
            navigate("/admin"); // Redirect to admin page
          } else {
            navigate("/user"); // Redirect to user home page
          }
        } else {
          alert("Your account is not verified. Please check your email for verification.");
        }
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred");
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <div className="grid w-full h-screen grid-cols-1 sm:grid-cols-2">
        <div className='hidden sm:block'>
          <img className='object-cover w-full h-full' src={loginImg} alt='Login' />
        </div>
        <div className='bg-white flex flex-col justify-center'>
          <form className='max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg'>
            <h2 className='text-4xl font-bold text-center py-4'>WELCOME BACK</h2>
            <div className='flex flex-col py-2'>
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input
                className='mt-1 p-2 w-full border border-gray-400 rounded-md'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col py-2'>
              <label htmlFor="password" className="block text-lg font-medium">Password</label>
              <input
                className='mt-1 p-2 w-full border border-gray-400 rounded-md'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full py-2 mt-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className="text-center mt-2">
              <button className="text-red-500 hover:underline" onClick={navigateToForgotPassword}>
                Forgot Password?
              </button>
            </div>
            <div className='font-bold text-center mt-4'>
              <h2 className='text-gray-500'>Or Login with</h2>
            </div>
            <div className="mt-4 text-center">
              <span className='text-gray-400'>Not a Member yet? </span>
              <button className='text-red-500 hover:underline' onClick={navigateToRegister}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
