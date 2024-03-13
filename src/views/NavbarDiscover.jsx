import React from 'react'
import style from './Stylesheets/NavbarDiscover.module.css';
import { useAuth } from '../context/AuthContext';

export const NavbarDiscover = () => {

  const {setShowAll} = useAuth();


  return (
      <nav className={style.NavbarDiscover}>
        <button onClick={() => setShowAll(true)} className={style.button}>Show All</button>
        <button onClick={() => setShowAll(false)} className={style.button}>Show Matching</button>
      </nav>
      
  )
}
