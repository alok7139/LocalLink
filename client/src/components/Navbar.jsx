import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { Context } from '../main';
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Navbar() {
  const {isauthenticated,setisauthenticated} = useContext(Context)
  const [toggle, setToggle] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const toggleServiceDropdown = () => {
    setServiceOpen(!serviceOpen);
  };

  const toggleResponsive = () => {
    setToggle(!toggle);
  };
  const handlemouse = () => {
    setServiceOpen(true);
  }

  const handleleave = (e) => {
    if(!e.currentTarget.contains(e.relatedTarget)){
      setServiceOpen(false);
    }
  }
  

  const handlelogout = async() => {
    await axios.get("https://locallink.onrender.com/api/v1/user/logout" , {withCredentials:true})
    .then((res) => {
      setisauthenticated(false)
      toast.success(res.data.message);
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  }

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
                  {serviceOpen ? <GoChevronUp  /> : <GoChevronDown/>}
                </div>
                {serviceOpen && (
                  <ul className="mt-2 w-full bg-white text-black rounded-md shadow-lg">
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to={'/localevents'}>Local Events</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/gardening'}>Gardening</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/lostpets'}>Lost Pets</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/tutoring'}>Tutoring</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/handyman'}>Handyman</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2">
                      <Link to={'/sales'}>Sell</Link>
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
                {
                  !isauthenticated ? 
                  <Link to={'/login'}><button className="bg-black text-xl font-serif text-white p-3 rounded-xl w-full">Sign in</button></Link>
                  : <button className="bg-black text-xl font-serif text-white p-3 rounded-xl w-full" onClick={handlelogout}>Logout</button>
                }
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

          <div onMouseEnter={handlemouse} onMouseLeave={handleleave}>
          <li  className="hover:text-blue-500 relative" onClick={toggleServiceDropdown}>
            <Link className="flex items-center" to={'#'}>
              Services {serviceOpen ? <GoChevronUp/> : <GoChevronDown/>}
            </Link>

            {/* Dropdown menu */}
            {serviceOpen && (
              <ul className="absolute top-full left-0 w-40 bg-white text-black rounded-md shadow-lg z-50">
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link to={'/localevents'}>Local Events</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/gardening'}>Gardening</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/lostpets'}>Lost Pets</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/tutoring'}>Tutoring</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/handyman'}>Handyman</Link>
                </li>
                <li className="hover:bg-gray-200 px-4 py-2">
                  <Link to={'/sales'}>Sell</Link>
                </li>
              </ul>
            )}
          </li>
          </div>
          

          <li className="hover:text-blue-500">
            <Link to={'/about'}>About</Link>
          </li>
          <li className="hover:text-blue-500">
            <Link to={'/contact'}>Contact</Link>
          </li>

          <li>
            {
              !isauthenticated ? 
              <Link to={'/login'}><button className="bg-black text-xl font-serif text-white p-3 rounded-xl">Sign in</button></Link>
              :
              <button className="bg-black text-xl font-serif text-white p-3 rounded-xl" onClick={handlelogout}>Logout</button>
            }
          </li>
        </ul>
      </div>
    </nav>
    <hr className=''/>
    </>
  );
}

export default Navbar;
