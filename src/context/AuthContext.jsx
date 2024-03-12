import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//Initializes a new Context object for auth-related data. 
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);


  const login = async (formData, setLoading, setError) => {
    setLoading(true);
    console.log("im here inside login")
    const api_url = import.meta.env.VITE_BACKEND_URL;
    try {
     
      const response = await axios.post(`http://localhost:8000/users/login`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const {token, user} = response.data;
      console.log("rd:",response.data)
      localStorage.setItem("jwt", token)
      setToken(token)
      console.log("token after setting", token)
      setUser(user)


      navigate("/discover");
 
    } catch (e) {
      console.log(e);
      setError(e.response.data)
      setTimeout(() => {
        setError(null)
      }, 3000)

      
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null)
    setUser(null)
    navigate("/login");
  };

  useEffect(() => {

    const fetchUser = async () => {
      if(token){
        const api_url = import.meta.env.VITE_BACKEND_URL;
        try {

          const response = await axios.get(`${api_url}/users/user`, {
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
             }
          });

          setUser(response.data)
    
        } catch (e) {
          console.log(e);
          logout()
          
        } 
      }
    }
    
    fetchUser()
  }, [token])


  const updateUser = async ({formData, notify, setError }) => {
    const api_url = import.meta.env.VITE_BACKEND_URL;
    try {
      console.log("im isnide update user")
      const response = await axios.put(`${api_url}/users/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User response', response.data);
      setUser(response.data);
      notify();
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else if (error.request) {
        setError('No response received');
      } else {
        console.error('Error setting up the request', error.message);
      }
    }
  };
  
  return (
    <AuthContext.Provider value={{user, token, login, logout, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
