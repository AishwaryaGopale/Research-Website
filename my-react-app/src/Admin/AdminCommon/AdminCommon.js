import React, { useState, useEffect, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import logo from './Images/passionit.png';
import fullScreenImage from './Images/research.png'; // Replace with your image path
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from 'jwt-decode';

const AdminCommon = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const decodeToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          setEmail(decoded.email);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    decodeToken();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fullScreenImage})` }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10">
        <div className="sticky top-0 bg-[#112ea3]">
          <nav>
            <div className="mx-auto max-w-7xl ">
              <div className="flex justify-between mx-auto w-5/5 ">
                <div className="flex items-center justify-between my-2 lg:justify-end lg:gap-[100px] md:font-medium">
                  <Link to=" "> <img src={logo} alt="" className="h-[40px] w-[100px]" /></Link>
                  <div className="hidden gap-10 lg:flex">
                    <Link to="" className="mr-2 text-white">Dashboard</Link>
                    <Link to="jtable" className="mr-2 text-white">JournalTable</Link>
                    <Link to="research ref " className="mr-2 text-white">Research</Link> 
                    <Link to="startup ref " className="mr-2 text-white">Startup</Link>
                    <Link to="patent ref " className="mr-2 text-white">Patent</Link>
                    <Link to="valuechain ref " className="mr-2 text-white">Valuechain</Link>
                    <Link to="sdg ref " className="mr-2 text-white">SDG</Link>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="items-center hidden gap-10 xs:flex">
                    <div className="items-center hidden gap-2 lg:flex"></div>
                    <div></div>
                  </div>
                  <div className="flex items-center lg:hidden">
                    <button onClick={() => setToggleMenu(!toggleMenu)}>
                      <Bars3Icon className="h-6" />
                    </button>
                  </div>
                  {/* Profile Logo and Menu */}
                  {isLoggedIn && (
                    <div className="relative flex items-center" ref={profileMenuRef}>
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                      >
                        <FontAwesomeIcon icon={faUserCircle} className="h-6" />
                        {email && <span className="ml-2 text-white">{email}</span>}
                      </button>
                      {profileMenuOpen && (
                        <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg">
                          <div className="px-4 py-2 text-gray-800">
                            <p className="font-semibold">{email}</p>
                            <button
                              onClick={handleLogout}
                              className="mt-2 w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200"
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700 ${
                !toggleMenu ? "h-0" : "h-full"
              }`}
            >
              <div className="px-8">
                <div className="flex flex-col gap-8 font-bold tracking-wider mt-4 mr-6">
                  <Link to="">Dashboard</Link>
                  <Link to="jtable">JournalTable</Link>
                  <Link to="research ref ">Research</Link>
                  <Link to="startup ref ">Startup</Link>
                  <Link to="patent ref ">Patent</Link>
                  <Link to="valuechain ref ">Valuechain</Link>
                  <Link to="sdg ref ">SDG</Link>
                </div>
              </div>
            </div>
          </nav>
          <hr className="border border-[#9b9b9b]" />
        </div>
        
        {/* Main Content */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminCommon;
