import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const toggleServiceDropdown = () => {
    setServiceOpen(!serviceOpen);
  };

  const toggleResponsive = () => {
    setToggle(!toggle);
  };

  return (
    <>
    <nav className="bg-neutral-200 w-full fixed z-50 top-0 py-6 flex justify-between items-center ">
      <div className="ml-7">
        <Link to={'/'}>
          <img src="/logo2.png" alt="logo" className="sm:w-32 h-auto w-28" />
        </Link>
      </div>

      {/* Hamburger Icon for mobile view */}
      <div className="md:hidden relative mr-8">
        <GiHamburgerMenu 
          className="text-4xl cursor-pointer"
          onClick={toggleResponsive} 
        />

        {/* Responsive dropdown menu */}
        {toggle && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
            <ul className="flex flex-col items-start space-y-2 p-4">
              <li className="hover:text-stone-500">
                <Link to={'/'}>Home</Link>
              </li>

              <li className="hover:text-stone-500 relative" onClick={toggleServiceDropdown}>
                <div className="flex items-center">
                  <Link to={'#'}>Services</Link>
                  <IoMdArrowDropdown className="ml-1" />
                </div>
                {serviceOpen && (
                  <ul className="mt-2 w-full bg-white text-black rounded-md shadow-lg">
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to={'/service1'}>Funding</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/service2'}>Gardening</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/service3'}>Security</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/service4'}>Tutoring</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/service5'}>Handyman</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/service6'}>Sales</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="hover:text-stone-500">
                <Link to={'/about'}>About</Link>
              </li>
              <li className="hover:text-stone-500">
                <Link to={'/contact'}>Contact</Link>
              </li>

              <li>
                <button className="bg-blue-500 text-white p-2 rounded-xl w-full">Sign in</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Navbar links for medium and larger screens */}
      <div className={`hidden md:flex items-center space-x-7 text-xl mr-20`}>
        <ul className="flex items-center space-x-7">
          <li className="hover:text-blue-500">
            <Link to={'/'}>Home</Link>
          </li>

          <li className="hover:text-blue-500 relative" onClick={toggleServiceDropdown}>
            <Link className="flex items-center" to={'#'}>
              Services <IoMdArrowDropdown className="ml-1" />
            </Link>

            {/* Dropdown menu */}
            {serviceOpen && (
              <ul className="absolute top-full left-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link to={'/service1'}>Funding</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/service2'}>Gardening</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/service3'}>Security</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/service4'}>Tutoring</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/service5'}>Handyman</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/service6'}>Sales</Link>
                </li>
              </ul>
            )}
          </li>

          <li className="hover:text-blue-500">
            <Link to={'/about'}>About</Link>
          </li>
          <li className="hover:text-blue-500">
            <Link to={'/contact'}>Contact</Link>
          </li>

          <li>
            <button className="bg-blue-500 text-white p-2 rounded-xl">Sign in</button>
          </li>
        </ul>
      </div>
    </nav>
    <hr className=''/>
    </>
  );
}

export default Navbar;
