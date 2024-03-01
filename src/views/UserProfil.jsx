import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UserProfil = () => {
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)

  const {id} = useParams();

  useEffect(() => {
    try {
      const response = axios.get(`http://localhost:8000/users/${id}`)
      setUser(response.data)
      
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      }else if (error.request) {
        setError('No response received')
    }
    console.error('Error setting up the request', error.message)
  }
  }, [])




  return (

    <div>
      <h1>My Profile</h1>

    </div>

  )
}
