import React from 'react'
import {slide as Menu} from 'react-burger-menu'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {

  return (
    <div>
      <Menu>
        <NavLink id="home" className="menu-item" to="/">Home</NavLink>
        <NavLink id="about" className="menu-item" to="/discover">Discover</NavLink>
        <NavLink id="contact" className="menu-item" to="/profile">Profile</NavLink>
      </Menu>
    </div>
  )
}
