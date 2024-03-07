import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


export const OtherUserProfil = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponce = await axios.get(`http://localhost:8000/users/${id}`);
        setUser(userResponce.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

  }, []);

  const handleContactClick = () => {
    const emailAddress = user.email; // Replace with your email address
    const subject = 'Inquiry from your TechneSwap';
    const body = 'Hello, I am interested in swapping skills with you.';

    const mailtoLink = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's default email client
    window.location.href = mailtoLink;
  };




  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <h2>Skills</h2>
      <ul>
        {user.skills && user.skills.map((skill) => (
          <li key={skill._id}>{skill.name}</li>
        ))}
      </ul>
      <h2>Needs</h2>
      <ul>
        {user.needs && user.needs.map((need) => (
          <li key={need._id}>{need.name}</li>
        ))}
      </ul>
      <p>{user.location}</p>
      <p>{user.description}</p>
      <button onClick={handleContactClick}>Contact</button>
    </div>
  )
}
