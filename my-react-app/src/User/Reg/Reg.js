import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import loginImg from './loginimg.png';
import * as API from "../Endpoints/Endpoints"

  const RegistrationPage = () => {
  const [membername, setmembername] = useState("");
  const [email, setemail] = useState("");
  const [organizationname, setorganizationname] = useState("");
  const [password, setpassword] = useState("");
  const [retypepassword, setretypepassword] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== retypepassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(API.REGISTER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ membername, email, organizationname, password }),
      });
      if (response.ok) {
        alert("Registration successful");
        history("/verify-otp");
      } else {
        const data = await response.text();
        alert("Registration failed: " + data);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full md:w-1/2 flex">
        <div className="w-1/2 mr-10 flex justify-center">
          <img src={loginImg} alt="Login" className="w-full max-h-full" style={{ objectFit: 'contain' }} />
        </div>
        <div className="w-1/2 p-4">
          <h2 className="text-4xl font-bold mb-8">Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="memberName" className="block text-lg font-medium text-gray-700">Member Name</label>
              <input
                type="text"
                id="membername"
                name="membername"
                value={membername}
                onChange={(e) => setmembername(e.target.value)}
                className="mt-1 p-2 w-full border border-black rounded-md text-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="mt-1 p-2 w-full border border-black rounded-md text-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="organizationName" className="block text-lg font-medium text-gray-700">Organization Name</label>
              <input
                type="text"
                id="organizationname"
                name="organizationname"
                value={organizationname}
                onChange={(e) => setorganizationname(e.target.value)}
                className="mt-1 p-2 w-full border border-black rounded-md text-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="mt-1 p-2 w-full border border-black rounded-md text-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="retypepassword" className="block text-lg font-medium text-gray-700">Re-Type Password</label>
              <input
                type="password"
                id="retypepassword"
                name="retypepassword"
                value={retypepassword}
                onChange={(e) => setretypepassword(e.target.value)}
                className="mt-1 p-2 w-full border border-black rounded-md text-lg"
              />
            </div>
            <div>
              <button type="submit" className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg">Register</button>
            </div>
          </form>
          <p className="mt-8 text-lg text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
