import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import techneSwapLogo from '../assets/TechneSwap-logos_transparentnew.png';
import './Stylesheets/Navbar.css';

export const Navbar = () => {
  const Navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (path) => {
    // Close the menu when a link is clicked
    setMenuOpen(false);
    // Navigate to the specified path
    Navigate(path);
  };

  return (
    <div className="navbar">
      <img src={techneSwapLogo} alt="logologin" className="logoimg" />

      <nav role='navigation'>
        <div id="menuToggle">
          <input type="checkbox" checked={isMenuOpen} onChange={handleMenuToggle} />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <a onClick={() => isMenuOpen && handleLinkClick('/')}><li>Home</li></a>
            <a onClick={() => isMenuOpen && handleLinkClick('/discover')}><li>Discover</li></a>
            <a onClick={() => isMenuOpen && handleLinkClick('/')}><li>Logout</li></a>
          </ul>
        </div>
      </nav>
    </div>
  );
};
