import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Stylesheets/UserProfile.module.css';

export const UserProfil = () => {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);

  const [updatedSkills, setUpdatedSkills] = useState([]);              
  const [updatedNeeds, setUpdatedNeeds] = useState([]);

  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableNeeds, setAvailableNeeds] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedNeeds, setSelectedNeeds] = useState([]);


  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);


  const { id } = useParams();


  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    location: user.location ||'',
    img: user.img ||'',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}`);
        setUser(response.data);
        console.log('User response', response.data);
  
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
  }, []); 
  

 const handleChange = (e) => {
  const {name, value} = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: name === 'img' ? e.target.files[0] : value,
  }));
 };

  const handleSkillsBasedOnCat = async (e) => {
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

  const handleNeedsBasedOnCat = async (e) => {
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
  


  const handleSelectedSkillsChange = (e) => {
    setSelectedSkills(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  const handleSelectedNeedChange = (e) => {
    setSelectedNeeds(Array.from(e.target.selectedOptions, (option) => option.value));
  }  

  const handleUpdateSkills = () => {
    setUser((prevUser) => {
      const updatedUserSkills = [...prevUser.skills];
  
      updatedSkills.forEach((updatedSkill) => {
        const existingSkillIndex = updatedUserSkills.findIndex(
          (userSkill) => userSkill.name === updatedSkill
        );
  
        if (existingSkillIndex !== -1) {
          // Update the existing skill with the new data
          updatedUserSkills[existingSkillIndex] = availableSkills.find(
            (availableSkill) => availableSkill.name === updatedSkill
          );
        } else {
          // Skill not found, add it to the array
          updatedUserSkills.push(
            availableSkills.find((availableSkill) => availableSkill.name === updatedSkill)
          );
        }
      });

      const uniqueUserSkills = Array.from(new Set(updatedUserSkills.map(skill => skill.name)))
      .map(name => updatedUserSkills.find(skill => skill.name === name));
  
      return {
        ...prevUser,
        skills: uniqueUserSkills,
      };
    });
  
    setUpdatedSkills([]);
  };

  const handleUpdateNeeds = () => {
    setUser((prevUser) => {
      const updatedUserNeeds = [...prevUser.needs];
  
      updatedNeeds.forEach((updatedNeed) => {
        const existingNeedIndex = updatedUserNeeds.findIndex(
          (userNeed) => userNeed.name === updatedNeed
        );
  
        if (existingNeedIndex !== -1) {
          // Update the existing Need with the new data
          updatedUserNeeds[existingNeedIndex] = availableNeeds.find(
            (availableNeed) => availableNeed.name === updatedNeed
          );
        } else {
          // Need not found, add it to the array
          updatedUserNeeds.push(
            availableNeeds.find((availableNeed) => availableNeed.name === updatedNeed)
          );
        }
      });
  
      return {
        ...prevUser,
        needs: updatedUserNeeds,
      };
    });
  
    setUpdatedNeeds([]);
  };
  
  

  const handleDeleteSkillAl = (skill) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: prevUser.skills.filter((s) => s._id !== skill._id),
    }));
  };

  const handleDeleteSkillUp = (skill) => {
    const skillId = availableSkills.find((updatedSkill) => updatedSkill._id === skill)._id;
    setUpdatedSkills((prevSkills) => prevSkills.filter((s) => s !== skillId));
  };
  


  const handleDeleteNeedAl = (need) => {
    setUser((prevUser) => ({
      ...prevUser,
      needs: prevUser.needs.filter((n) => n._id !== need._id),
    }));
  };

  const handleDeleteNeedUp = (need) => {
    setUpdatedNeeds(updatedNeeds.filter((n) => n !== need._id));
  };




  const handleUpdateProfile = () => {

     const newFormData = new FormData();

      if (formData.img) {
      newFormData.append('img', formData.img);
      } else {
        newFormData.append('img', user.img);
      }

      if (formData.firstName) {
      newFormData.append('firstName', formData.firstName);
      } else {
        newFormData.append('firstName', user.firstName);
      }

      if (formData.lastName) {
      newFormData.append('lastName', formData.lastName);
      } else {
        newFormData.append('lastName', user.lastName);
      }

      if (formData.email) {
      newFormData.append('email', formData.email);
      } else {
        newFormData.append('email', user.email);
      }

      if (formData.location) {
      newFormData.append('location', formData.location);
      } else {
        newFormData.append('location', user.location);
      }

      newFormData.append('skills', user.skills)
      newFormData.append('needs', user.needs)



      const updatedUser = async () => {
        try {
          const response = await axios.put(`http://localhost:8000/users/update/${id}`, newFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          
          });
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

  




  return (
    <div className={style.UserProfile}>
    <h1>My Profile</h1>
    {user && (
      <div>
        {isEditMode ? (
          <form action="">
            <input type="file" name="img" onChange={handleChange} />
            <input
                type="text"
                defaultValue={user.firstName}
                onChange={handleChange}
              />
            <input
                type="text"
                defaultValue={user.lastName }
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            <input
                type="text"
                defaultValue={user.email}
                onChange={handleChange}
              />
            <input
                type="text"
                defaultValue={user.location}
                onChange={handleChange}
              />
          </form>
        ) : (
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="avatar" />
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <p>{user.location}</p>
          </div>
        )}


        <div className={style.skillsAndNeeds___Display}>
          
          <div className={style.skill__Display}>
            <p>Skills:</p>
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <div key={index} className={style.individualSkill}>
                  <p>{skill.name}</p>
                  {isEditMode && <button onClick={() => handleDeleteSkillAl(skill)} className={style.deleteBTn}>🗑️</button>}
                </div>
              ))
            ) : (
              <p>{!selectedSkills ? 'No skills listed.' : null}</p>
            )}
            {updatedSkills && updatedSkills.length > 0 ? (
              updatedSkills.map((skill, index) => (
                <div key={`updated-${index}`} className={style.individualSkill}>
                  <p>{availableSkills.find((availableSkill) => availableSkill._id === skill).name}</p>
                  {isEditMode && <button onClick={() => handleDeleteSkillUp(skill)} className={style.deleteBTn}>🗑️</button>}
                </div>
              ))
            ) : null}
                {isEditMode && (
            <div className={style.selections}>
              <label htmlFor="categorySelect">Select Category:</label>
              <select id="categorySelect" onChange={(e) => handleSkillsBasedOnCat(e)}>
              <option value="" disabled selected>Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label htmlFor="skillSelect">Select Skill:</label>
              <select id="skillSelect" multiple value={selectedSkills} onChange={handleSelectedSkillsChange}>
                {availableSkills.map((skill) => (
                  <option key={skill._id} value={skill._id}>
                    {skill.name}
                  </option>
                ))}
              </select>
              <button onClick={() => setUpdatedSkills([...updatedSkills, ...selectedSkills])}>
                +
              </button>
              <button onClick={handleUpdateSkills}>Update Skills</button>
            </div>
          ) 
                }
          </div>
          <div className={style.skill__Display}>
          <p>Needs:</p>
            {user.needs && user.needs.length > 0 ? (
              user.needs.map((need, index) => (
                <div key={index} className={style.individualSkill}>
                  <p>{need.name}</p>
                  {isEditMode && <button onClick={() => handleDeleteNeedAl(need)} className={style.deleteBTn}>🗑️</button>}
                </div>
              ))
            ) : (
              <p>{!selectedSkills ? 'No skills listed.' : null}</p>
            )}
            {updatedNeeds && updatedNeeds.length > 0 ? (
              updatedNeeds.map((need, index) => (
                <div key={`updated-${index}`} className={style.individualSkill}>
                  <p>{availableNeeds.find((availableNeed) => availableNeed._id === need).name}</p>
                  {isEditMode && <button onClick={() => handleDeleteNeedUp(need)} className={style.deleteBTn}>🗑️</button>}
                </div>
              ))
            ) : null}
            {isEditMode && (
              <div className={style.selections}>
               <label htmlFor="categorySelect">Select Category:</label>
              <select id="categorySelect" onChange={(e) => handleNeedsBasedOnCat(e)}>
              <option value="" disabled selected>Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label htmlFor="needSelect">Select Need:</label>
              <select id="needSelect" multiple value={selectedNeeds} onChange={handleSelectedNeedChange}>
                {availableNeeds.map((need) => (
                  <option key={need._id} value={need._id}>
                    {need.name}
                  </option>
                ))}
              </select>
              <button onClick={() => setUpdatedNeeds([...updatedNeeds, ...selectedNeeds])}>
                +
              </button>
              <button onClick={handleUpdateNeeds}>Update Needs</button>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    {isEditMode ? (
      <button onClick={handleUpdateProfile}>Save Profile</button>
    ) : (
      <button onClick={() => setIsEditMode(!isEditMode)}>Edit Profile</button>
    )}
  </div>
);
};