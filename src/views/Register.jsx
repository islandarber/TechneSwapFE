import React, { useState } from 'react'
import style from './Stylesheets/Register.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

export const Register = () => {
  const Navigate = useNavigate()
  const notify = () => toast('Account created successfully');
  const api_url = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.password2) {
      try {
        const response = await axios.post(`${api_url}/users/register`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        });
  
        console.log(response);
        notify();
        setTimeout(() => {
          Navigate('/login');
        }, 3000);
        
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
          console.log("Error registering", err.response.data.message)
          console.log("the error is", error);
        } else {
          setError('An error occurred');
        }
        console.error(err);
      }
    } else {
      alert('Passwords do not match');
    }
  };
  

  return (
    <div className={style.signupPage}>
      <h1>Create an account with us:</h1>
      {error && <p className={style.errormessage}>{error && error}</p>}
      <form className={style.signupForm} onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName" onChange={(e)=>handleChange(e)} />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName" onChange={(e)=>handleChange(e)} />
        <label>
          Email:
        </label>
        <input type="email" name="email" onChange={(e)=>handleChange(e)}/>
        <label>
          Password:
        </label>
        <input type="password" name="password" onChange={(e)=>handleChange(e)} />
        <label>
          Confirm Password:
        </label>
        <input type="password" name="password2" onChange={(e)=>handleChange(e)} />
        <button type="submit">Sign me up</button>

      </form>

      <div className='mb-5'>
        <p>Already have an account? <a onClick={() => Navigate('/login')}>Login</a></p>
      </div>

      <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 3000,
        style: {
          background: '#3e8fb0',
          color: '#fff',
        },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>

    </div>
  )
}
