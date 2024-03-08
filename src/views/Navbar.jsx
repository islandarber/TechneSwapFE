import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import techneSwapLogo from '../assets/TechneSwap-logos_transparentnew.png';
import './Stylesheets/Navbar.css';
import axios from 'axios';

export const Navbar = () => {
  const Navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleLinkClick = (path) => {
    Navigate(path);
    setIsNavOpen(false); // Close the navbar after clicking a link
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponce = await axios.get('http://localhost:8000/users/65dcaeda6e111616d6f31868');
        setUser(userResponce.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);



  return (
    <div className="navbar">
      <img src={techneSwapLogo} alt="logologin" className="logoimg" onClick={()=>Navigate('/')}/>

      <div className="flex items-center justify-between border-customgrey-400 mr-2">
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
                    <img src={user && user.img} alt="user" className="h-16 w-16 rounded-full object-cover" onClick={() => handleLinkClick(`/${user._id}`)} />
                    <p className='text-center mt-1 text-s p-1'>{user && user.firstName}</p>
                  </div>
                </li>
                <li className='mb-4'>
                  <a onClick={() => handleLinkClick('/Discover')}>Discover</a>
                </li>
                <li className='mb-4' >
                  <a onClick={() => handleLinkClick('/')} className='text-black'>Log Out</a>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
            <li className="my-8">
              <a onClick={() => handleLinkClick('/')}>Home</a>
            </li>
            <li className="my-8">
              <a onClick={() => handleLinkClick('/Discover')}>Discover</a>
            </li>
            <li className="my-8">
              <a onClick={() => handleLinkClick('/')}>Log Out</a>
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
      </div>
    </div>
  );
};
