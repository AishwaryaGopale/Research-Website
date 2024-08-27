import React, { useState } from 'react';
import loginImg from './loginimg.png'; // Updated import statement for the image
import { useNavigate } from "react-router-dom";
import * as API from "../User/Endpoints/Endpoints"

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
      // Save token in local storage or context
      localStorage.setItem("token", data.token);
      navigate("/user"); // Redirect to user home page
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred");
  }
};

  const Reg = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="grid w-full h-screen grid-cols-1 sm:grid-cols-2">
        <div className='hidden sm:block'>
          <img className='object-cover w-full h-full' src={loginImg} alt='hello' /> {/* Updated image source */}
        </div>
        <div className='bg-[white] flex flex-col justify-center'>
          <form className='max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg'>
            <h2 className='text-4xl dark:text-[white] font-bold text-center py-[40px]'>WELCOME BACK</h2>
            <div className='flex flex-col py-2 text-black'>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                className='mt-1 p-2 w-full border border-black rounded-md text-lg'
                type='email'
                value={email} // Bind state variable
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col py-2 text-black'>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
              <input
                className='mt-1 p-2 w-full border border-black rounded-md text-lg'
                type='password'
                value={password} // Bind state variable
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full py-2 my-5 font-semibold text-white bg-[red] rounded-md shadow-md hover:bg-[#fa7575] focus:outline-none focus:ring focus:border-teal-700"
              onClick={handleSubmit}
            >
              Login
            </button>
            <div>
              <div className='font-bold text-center'>
                <h2 className='text-[#D62102]'>Or Login with</h2>
              </div>
              <div className="md:w-2/1 pl-[55px] font-Manrope font-semibold pt-[30px] p-4">
                <span>
                  <div className='inline text-[gray]'>Not a Member yet? </div>
                  <div className='text-[#D62102] inline'>
                    <button onClick={Reg}>Sign Up</button>
                  </div>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
