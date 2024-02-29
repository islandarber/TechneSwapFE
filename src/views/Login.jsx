import React from 'react'
import  style from './Stylesheets/Login.module.css'
import logoimage from './TechneSwap-logos_transparentnew.png'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

  const Navigate = useNavigate();


  return (
    <div className={style.loginPage}>
      <img src={logoimage} alt="logologin" className={style.logoimg}/>
      <form action='http://localhost:8000/users/login' method='POST' className={style.formlogin}>
        <label>
          Email:
          
        </label>
        <input type="email" name="email" />
        <label>
          Password:
          
        </label>
        <input type="password" name="password" />
        <input type="submit" value="Login" className={style.logininput} onClick={() => Navigate('/discover')}/>
      </form>
    
    
    </div>
  )
}
