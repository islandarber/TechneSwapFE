import React, { useState } from 'react'
import  style from './Stylesheets/Login.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {

  // My states
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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
    try {
      const response = await axios.post('http://localhost:8000/users/login', formData);
      console.log('Login response', response);
      setUser(response.data);
      Navigate('/discover');
    } catch (error) {
      if (error.response) {
        console.error('Error logging in', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request', error.message);
      }
      setError(error.response ? error.response.data : 'An error occurred');
    }
  };
  


  const Navigate = useNavigate();


  return (
    <div className={style.loginPage}>
      {error && <p className={style.error}>{error.message}</p>}
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
      

    
    </div>
  )
}
