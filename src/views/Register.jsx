import React from 'react'
import style from './Stylesheets/Register.module.css'
import logoimage from './TechneSwap-logos_transparentnew.png'

export const Register = () => {


  return (
    <div className={style.signupPage}>
      <img src={logoimage} alt="logologin" className={style.logoimg}/>
      <h1>Create an account with us:</h1>
      <form className={style.signupForm}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName" />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName" />
        <label>
          Email:
        </label>
        <input type="email" name="email" />
        <label>
          Password:
        </label>
        <input type="password" name="password" />
        <label>
          Confirm Password:
        </label>
        <input type="password" name="password2" />
        <button type="submit">Sign me up</button>

      </form>


    </div>
  )
}
