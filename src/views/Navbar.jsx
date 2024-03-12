import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import techneSwapLogo from '../assets/TechneSwap-logos_transparentnew.png';
import './Stylesheets/Navbar.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {

  const Navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const {user,token, logout} = useAuth();
  const navbarRef = useRef(null);

  const handleLinkClick = (path) => {
    Navigate(path);
    setIsNavOpen(false); // Close the navbar after clicking a link
  };

  const handleOutsideClick = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsNavOpen(false);
    }
  };

  console.log(user);

  useEffect(() => {

    document.addEventListener('click', handleOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []); // Empty dependency array ensures that useEffect runs only once

  return (
    <div className="navbar" ref={navbarRef}>
      <img src={techneSwapLogo} alt="logologin" className="logoimg" />
  
      { user && <div className="flex items-center justify-between border-customgrey-400 mr-2">
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>
  
            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="CROSS-ICON absolute top-0 right-0 px-1 py-1 pt-0"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-6 w-6 text-gray-600 mt-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between my-3">
                <li className='mb-7'>
                  <div className='flex flex-col items-center'>
                  {user.img ? (
                      <img
                        src={user.img}
                        alt={user.name}
                        className="h-16 w-16 rounded-full object-cover"
                        onClick={() => handleLinkClick('user')}
                      />
                    ) : (
                      <img
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                        alt="avatar"
                        className="h-16 w-16 rounded-full object-cover"
                        onClick={() => handleLinkClick('user')}
                      />
                    )}
                    <p className='text-center mt-1 text-s p-1'>{user && user.firstName}</p>
                  </div>
                </li>
                <li className='mb-4'>
                  <a onClick={() => handleLinkClick('/discover')}>Discover</a>
                </li>
                <li className='mb-4' >
                  <a onClick={logout} className='text-black'>Log Out</a>
                </li>
              </ul>
            </div>
          </section>
  
          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex items-center">
            <li onClick={() => handleLinkClick('/user')} className='flex'>
              <img src={user && user.img} alt="user" className="h-16 w-16 rounded-full object-cover border-custom-orange"  />
              <p className='text-center text-gray mt-1 text-s p-1' >{user && user.firstName}</p>
            </li>
            <li>
              <a onClick={() => handleLinkClick('/discover')} className='text-grey'>Discover</a>
            </li>
            <li >
              <a onClick={logout} className='text-grey'>Log Out</a>
            </li>
          </ul>
        </nav>
        {/* Your existing styles */}
        <style>{`
          .hideMenuNav {
            display: none;
          }
          .showMenuNav {
            display: block;
            position: absolute;
            width: 30%;
            top: 0;
            right: 0;
            background: white;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            border-radius: 10px;
            background-color: #f9a03f;
            color: white;
            font-weight: bold;
            margin-top: 5px;
            margin-right: 5px;
          }
        `}</style>
      </div>}
    </div>
  );
  
};
