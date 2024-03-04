import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Stylesheets/UserProfile.module.css';

export const UserProfil = () => {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);

  const [updatedSkills, setUpdatedSkills] = useState([]);              
  const [updatedNeeds, setUpdatedNeeds] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedNeeds, setSelectedNeeds] = useState([]);


  const [availableskills, setAvailableSkills] = useState([]);
  const [availableNeeds, setAvailableNeeds] = useState([]);


  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);


  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}`);
        setUser(response.data);
  
        const categoriesResponse = await axios.get('http://localhost:8000/categories');
        setCategories(categoriesResponse.data);
  
        console.log('User response', response.data);
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
  
    fetchData();
  }, [id, isEditMode]); // Include isEditMode in the dependency array
  

  const handleUpdateProfile = () => {
    setUpdatedUser((prevUpdatedUser) => ({
      ...prevUpdatedUser,
      skills: updatedSkills,
      needs: updatedNeeds,
    }))
      const updatedUser = async () => {
        try {
          const response = await axios.put(`http://localhost:8000/users/${id}`, user);
          setUser(response.data);
          console.log('User response', response.data);
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
      updatedUser();
    setIsEditMode(!isEditMode);

  };



  const handleSkillsOnChange = async (e) => {
    try {
      const skillsResponse = await axios.get(`http://localhost:8000/skills/${e.target.value}`);
      setAvailableSkills(skillsResponse.data);
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

  const handleNeedsOnChange = async (e) => {
    try {
      const needsResponse = await axios.get(`http://localhost:8000/skills/${e.target.value}`);
      setAvailableNeeds(needsResponse.data);
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
  


  const handleSkillChange = (e) => {
    setSelectedSkills(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  const handleNeedChange = (e) => {
    setSelectedNeeds(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  return (
    <div className={style.UserProfil}>
      <h1>My Profile</h1>
      {user && (
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="avatar" />
          <p>
            {isEditMode ? (
              <input
                type="text"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            ) : (
              user.firstName
            )}
          </p>
          <p>
            {isEditMode ? (
              <input
                type="text"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            ) : (
              user.lastName
            )}
          </p>
          <p>
            {isEditMode ? (
              <input
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            ) : (
              user.email
            )}
          </p>
          <p>
            Location:{' '}
            {isEditMode ? (
              <input
                type="text"
                value={user.location}
                onChange={(e) => setUser({ ...user, location: e.target.value })}
              />
            ) : (
              user.location
            )}
          </p>
          <div>
            { !user.skills ? (
            <p>Please update Profile to add skills</p>
          ) : user.skills.length === 0 ? (
            <p>Please update Profile to add skills</p>
          ) : (
            <p> Skills : {user.skills.map((skill) =>
              {<p> {skill.name} </p>}
            ).join(', ')}, {updatedSkills && updatedSkills.length > 0 ? updatedSkills.map((skill) => skill).join(', ') : ''} </p>
          )}
            {isEditMode && (
          <div className={style.selections}>
            <label htmlFor="categorySelect">Select Category:</label>
            <select id="categorySelect" onChange={(e) => handleSkillsOnChange(e)}>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="skillSelect">Select Skill:</label>
            <select id="skillSelect" multiple value={selectedSkills} onChange={handleSkillChange}>
              {availableskills.map((skill) => (
                <option key={skill._id} value={skill.name}>
                  {skill.name}
                </option>
              ))}
            </select>
            <button onClick={() => setUpdatedSkills([...updatedSkills, ...selectedSkills])}>
              Add
            </button>
          </div>
        ) 
      } 
    </div>
          <div>
          { !user.needs ? (
            <p>Please update Profile to add needs</p>
          ) : user.needs.length === 0 ? (
            <p>Please update Profile to add needs</p>
          ) : (
            <p> Needs : {user.needs.map((need) => need.name).join(', ')}, {updatedNeeds && updatedNeeds.length > 0 ? updatedNeeds.map((need) => need).join(', ') : ''} </p>
          )}
            {isEditMode ? (
              <div className={style.selections}>
                <label htmlFor="categorySelect">Select Category:</label>
                <select id="categorySelect" onChange={(e)=>handleNeedsOnChange(e)}>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="needSelect">Select Skill:</label>
                <select id="needSelect" multiple value={selectedNeeds} onChange={handleNeedChange}>
                  {availableNeeds.map((need) => (
                    <option key={need._id} value={need.name}>
                      {need.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => setUpdatedNeeds([...updatedNeeds, ...selectedNeeds])}>
                  Add
                </button>
              </div>
            ) : !user.needs ? (
              'Please update Profile to add needs'
            ) : user.needs.length === 0 ? (
              'Please update Profile to add needs'
            ) : (
              user.needs.map((need) => need.name).join(', ')
            )}
          </div>
        </div>
      )}

      {isEditMode 
      ?<button onClick={handleUpdateProfile}>Save Profile</button> 
      :<button onClick={()=> setIsEditMode(!isEditMode)}>Edit Profile</button>
      }    
          
    </div>
  );
};
