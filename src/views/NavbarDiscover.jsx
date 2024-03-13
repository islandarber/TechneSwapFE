import React from 'react'
import "./Stylesheets/NavbarDiscover.css"
import { useAuth } from '../context/AuthContext';

export const NavbarDiscover = () => {

  const {showAll, setShowAll} = useAuth();

  return (
      <nav className="NavbarDiscover">
        <button onClick={() => setShowAll(true)} className={showAll?"active" :"normalBtn"}>Show All</button>
        <button onClick={() => setShowAll(false)} className={showAll?"normalBtn":"active"}>Show Matching</button>
      </nav>
      
  )
}