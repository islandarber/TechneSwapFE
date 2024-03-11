import React, { useState } from 'react'
import  style from './Stylesheets/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const {login} = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, setLoading, setError);
  };
  


  const Navigate = useNavigate();


  return (
    <div className={style.loginPage}>
      {error && <p className={style.error}>{error.message}</p> }
      <>
      <form className={style.formlogin} onSubmit={handleSubmit}>
        <label>
          Email:
          
        </label>
        <input type="email" name="email" value={formData.email} onChange={(e)=> handleChange(e)} autoFocus/>
        <label>
          Password:
          
        </label>
        <input type="password" name="password" value={formData.password} onChange={(e)=> handleChange(e)}/>
        <button type="submit" value="Login" className="w-[5rem] p-2 border-none rounded-md bg-custom-orange shadow-md text-white text-lg">Login</button>
      </form>
      
    
      <div className={style.acountYet}>
        <p>Not an acount yet? <a onClick={() => Navigate('/register')}>Sign Up here!</a></p>
      </div>
      </>

      
    </div>
  )
}
