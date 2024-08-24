import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import the logout icon
import logo from './Images/passionit.png';
import { Link } from "react-router-dom";
import Chatbot from "../Bot/Boat";

const User = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      <div className="sticky top-0 bg-[#112ea3]">
        <nav>
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mx-auto w-5/5">
              <div className="flex items-center justify-between my-2 lg:justify-end lg:gap-[100px] md:font-medium">
                <Link to=" ">
                  <img src={logo} alt="" className="h-[40px] w-[100px]" />
                </Link>
                <div className="hidden gap-10 lg:flex">
                  <Link to="" className="mr-2 text-white">
                    Home
                  </Link>
                  <Link to="about" className="mr-6 text-white">
                    About
                  </Link>
                  <Link to="community" className="mr-6 text-white">
                    Community
                  </Link>

                  <div className="relative group inline-block">
                    <Link
                      to="research"
                      className="mr-6 text-white group-hover:text-white"
                    >
                      Research
                    </Link>
                    <div className="absolute left-0 mt-2 bg-white rounded-md shadow-lg hidden group-hover:block group-focus-within:block">
                      <Link
                        to="journalupload"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200"
                      >
                        Journal Upload
                      </Link>
                      <Link
                        to="bookupload"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200"
                      >
                        Book Upload
                      </Link>
                      <Link
                        to="viewjournal"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200"
                      >
                        View Journal
                      </Link>
                      <Link
                        to="viewbook"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200"
                      >
                        View Book
                      </Link>
                    </div>
                  </div>
                  <a
                    href="https://forms.gle/2SLTSDHSadLDk2Ak7"
                    className="mr-6 bg-[#f7f7f7] border border-black rounded-[20px] pl-[15px] pr-[15px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                  <Link
                    to="register"
                    className="mr-6 bg-[#f7f7f7] border border-black rounded-[20px] pl-[15px] pr-[15px]"
                  >
                    Register
                  </Link>
                  <Link
                    to="login"
                    className="mr-6 bg-[#f7f7f7] border border-black rounded-[20px] pl-[15px] pr-[15px]"
                  >
                    Login
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center lg:hidden">
                  <button onClick={() => setToggleMenu(!toggleMenu)}>
                    <Bars3Icon className="h-6" />
                  </button>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:text-gray-300 focus:outline-none lg:flex"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div
            className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
              !toggleMenu ? "h-0" : "h-full"
            }`}
          >
            <div className="px-8">
              <div className="flex flex-col gap-8 font-bold tracking-wider mt-4 mr-6">
                <Link to=" ">Home</Link>
                <Link to="about">About</Link>
                <Link to="community">Community</Link>
                <Link to="research">Research</Link>
                <Link to="contactus">Contact Us</Link>
                <Link to="register">Register</Link>
                <Link to="signin">Sign In</Link>
              </div>
            </div>
          </div>
        </nav>
        <hr className="border border-[#9b9b9b]" />
      </div>

      <div>
        <Outlet />
      </div>
      {/* Chatbot container with position fixed */}
      <div className="fixed bottom-4 right-4">
        <Chatbot />
      </div>
    </>
  );
};

export default User;
