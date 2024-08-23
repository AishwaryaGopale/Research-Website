
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import logo from './Images/passionit.png';
import { Link } from "react-router-dom";

const AdminCommon= () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
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
              </div>
            </div>
          </div>
          <div
            className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
              !toggleMenu ? "h-0" : "h-full"
            }`}
          >
            <div className="px-8">
            </div>
          </div>
        </nav>
        <hr className="border border-[#9b9b9b]" />
      </div>
      <div>
        <Outlet />
      </div>    
    </>
  );
};

export default AdminCommon;
