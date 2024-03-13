import React from 'react'
import style from './Stylesheets/NavbarDiscover.module.css';

export const NavbarDiscover = ({setShowAll}) => {


  return (
      <nav className={style.NavbarDiscover}>
        <button onClick={() => setShowAll(true)} className={style.button}>Show All</button>
        <button onClick={() => setShowAll(false)} className={style.button}>Show Matching</button>
      </nav>
      
  )
}
