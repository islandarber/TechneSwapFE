import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import techneSwapLogo from '../assets/TechneSwap-logos_transparentnew.png';
import './Stylesheets/Navbar.css';


export const Navbar = () => {
  const Navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <div className="navbar">
      <img src={techneSwapLogo} alt="logologin" className="logoimg" />
      
  <div className="flex items-center justify-between border-b border-customgrey-400 mr-2">
    <nav>
      <section className="MOBILE-MENU flex lg:hidden">
        <div
          className="HAMBURGER-ICON space-y-2"
          onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
        >
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        </div>

        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
          <div
            className="CROSS-ICON absolute top-0 right-0 px-1 py-1 pt-0"
            onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
          >
            <svg
              className="h-8 w-8 text-gray-600"
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
          <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] mt-3">
            <li className="my-8">
              <a onClick={Navigate('/')}>Home</a>
            </li>
            <li className="my-8">
              <a onClick={Navigate('/Discover')}>Discover</a>
            </li>
            <li className="my-8">
              <a onClick={Navigate('/')}>Log Out</a>
            </li>
          </ul>
        </div>
      </section>

      <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/portfolio">Portfolio</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
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
