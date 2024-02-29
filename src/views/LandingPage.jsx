import React from 'react'
import style from './Stylesheets/LandingPage.module.css'
import techneSwapLogo from './TechneSwap-logos_transparentnew.png'
import { useNavigate } from 'react-router-dom'

export const LandingPage = () => {

  const navigate = useNavigate();
  
  return (
    <div className={style.LandingPageAll}>
    <div><img src={techneSwapLogo} alt="logo" className={style.logoimg}/></div>
    
    <div className={style.LandingPage}>
      
      <div className={style.titlepart}>
        <h1>Welcome to TechneSwap!</h1>
        <h2>Unlock the Power of Exchange!</h2>
        <button className={style.learnmoreButton} onClick={()=> navigate('/howto')}>Click me to learn more...</button>
        <p>
        Join us in a world where collaboration knows no bounds and where your skills find their perfect match!</p>
        
      <button className={style.signupButton} onClick={()=> navigate('/register')}>Sign up!</button>

      <div className={style.alreadyAccount}>
        <p>Already an account?</p>
        <button className={style.normalButton} onClick={()=> navigate('/login')}>Log in</button>
      </div>
      </div>


      

    </div>
    </div>
  )
}
