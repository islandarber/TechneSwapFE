import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Stylesheets/UserProfile.module.css';
import Modal from '../components/Modal';
import toast, {Toaster} from 'react-hot-toast'

export const UserProfil = () => {
  const [categories, setCategories] = useState([]);
  const notify = () => toast('Account updated successfully');

  const [updatedSkills, setUpdatedSkills] = useState([]);              
  const [updatedNeeds, setUpdatedNeeds] = useState([]);

  const [loading, setLoading] = useState(true);

  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableNeeds, setAvailableNeeds] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedNeeds, setSelectedNeeds] = useState([]);


  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [isModalSkillsOpen, setIsModalSkillsOpen] = useState(false);
  const [isModalNeedsOpen, setIsModalNeedsOpen] = useState(false);

  

  const { id } = useParams();


  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8000/users/${id}`);
        const categoriesResponse = await axios.get('http://localhost:8000/categories');

        setCategories(categoriesResponse.data);
        setUserData({
          firstName: userResponse.data.firstName,
          lastName: userResponse.data.lastName,
          email: userResponse.data.email,
          location: userResponse.data.location,
          skills: userResponse.data.skills,
          needs: userResponse.data.needs,
          img: userResponse.data.img,
        });
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else if (error.request) {
          setError('No response received');
        } else {
          console.error('Error setting up the request', error.message);
        }
      }finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); 
  

 const handleChange = (e) => {
  const {name, value} = e.target;
  setUserData((prevData) => ({
    ...prevData,
    [name]: name === 'img' ? e.target.files[0] : value,
  }));
 };

 console.log(userData, 'userdata')

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
    setUserData((prevUser) => {
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
    setSelectedSkills([]);
    setAvailableSkills([]);
    setIsModalSkillsOpen(false)
  };

  const handleUpdateNeeds = () => {
    setUserData((prevUser) => {
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
    setSelectedNeeds([]);
    setAvailableNeeds([]);
    setIsModalNeedsOpen(false)

  };
  

  const handleDeleteSkillAl = (skill) => {
    setUserData((prevUser) => ({
      ...prevUser,
      skills: prevUser.skills.filter((s) => s._id !== skill._id),
    }));
  };


  const handleDeleteNeedAl = (need) => {
    setUserData((prevUser) => ({
      ...prevUser,
      needs: prevUser.needs.filter((n) => n._id !== need._id),
    }));
  };


  const handleUpdateProfile = () => {
    console.log('User', userData);
    const formData = new FormData();
    formData.append('img', userData.img);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    formData.append('location', userData.location);
    formData.append('skills', JSON.stringify(userData.skills));
    formData.append('needs', JSON.stringify(userData.needs));

      const updatedUser = async () => {
        try {
          const response = await axios.put(`http://localhost:8000/users/update/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('User response', response.data);
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
      updatedUser();
      setIsEditMode(!isEditMode);
  };

  
  return (
    <div >
    <h1>My Profile</h1>
    {loading ? <p>Loading...</p> : userData ? (
      <div className={style.UserProfile}>
         {userData.img ? (
      <img src={typeof userData.img === 'string' ? userData.img : URL.createObjectURL(userData.img)} alt={userData.firstName} width={200} className={style.img} />
      ) : (
      <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="avatar" width={200} className={style.img} />
      )}
   
          {isEditMode ? (
            <>
              <input name="img" type="file" onChange={handleChange} />
              <input
                type="text"
                name='firstName'
                defaultValue={userData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name='lastName'
                defaultValue={userData.lastName}
                onChange={handleChange}
              />
              <input
                type="text"
                name='email'
                defaultValue={userData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name='location'
                defaultValue={userData.location}
                placeholder='Add your location'
                onChange={handleChange}
              />
            </>
            
          ) : (
            <>
              <p>{userData.firstName}</p>
              <p>{userData.lastName}</p>
              <p>{userData.email}</p>
              <p>{userData.location}</p>
            </>
          )}
        {/* Skills management */}
        <div className='mt-4'>
          <h5 className='font-bold text-lg'>Your skills</h5>
            <div>
              <div className='flex flex-wrap gap-2'>
              {userData.skills && userData.skills.length > 0 ? (
                userData.skills.map((skill, index) => (
                  <div key={index} className="flex bg-custom-blue hover:bg-custom-blue-dark text-white items-center px-2 py-1">
                    <p>{skill.name}</p>
                    {isEditMode && <button onClick={() => handleDeleteSkillAl(skill)} className={style.deleteBTn}>X</button>}
                  </div>
                ))
              ) : (
                <p>No skills added</p>
              )}
            </div>

            {isEditMode ? (
              <button className="mt-4 px-4 py-2 bg-custom-blue hover:bg-custom-blue-dark text-white rounded" onClick={() => setIsModalSkillsOpen(true)}>
              Add new skill      
              </button>
          ): null }

            
            <Modal isOpen={isModalSkillsOpen} onClose={() => {
              setIsModalSkillsOpen(false)
              setUpdatedSkills([]);
              setSelectedSkills([]);
              setAvailableSkills([]);
            }}
            >
              <h2 className="text-lg font-bold mb-4">Select new skill</h2>
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
                    <option key={skill._id} value={skill.name} onClick={() => setUpdatedSkills([...updatedSkills, ...selectedSkills])} disabled={userData.skills.some((userSkill) => userSkill.name === skill.name)}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
              className={`px-4 py-2 bg-custom-blue hover:bg-custom-blue-dark text-white rounded mt-4 ${
                selectedSkills.length === 0 ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={handleUpdateSkills}
              disabled={selectedSkills.length === 0}
            >
              Add new skill
            </button>

            </Modal>
                    
        </div>

          

        {/* Needs management */} 
        <div className='mt-4'>
          <h5 className='font-bold text-lg'>Your needs</h5>
          <div className='flex flex-wrap gap-2'>

            {userData.needs && userData.needs.length > 0 ? (
              userData.needs.map((need, index) => (
                <div key={index} className="flex bg-custom-blue hover:bg-custom-blue-dark text-white items-center px-2 py-1">

                  <p>{need.name}</p>
                  {isEditMode ? <button onClick={() => handleDeleteNeedAl(need)} className={style.deleteBTn}>X</button> : null}
                </div>
              ))
            ) : (
              <p>No needs added</p>
            )}
            </div>


          {isEditMode ? (
              <button className="mt-4 px-4 py-2 bg-custom-blue hover:bg-custom-blue-dark text-white rounded" onClick={() => setIsModalNeedsOpen(true)}>
              Add new need      
              </button>
          ): null }

          <Modal isOpen={isModalNeedsOpen} onClose={() => {
            setIsModalNeedsOpen(false)
            setUpdatedNeeds([]);
            setSelectedNeeds([]);
            setAvailableNeeds([]);
          }}>
            <h2 className="text-lg font-bold mb-4">Select new need</h2>
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
                  <option key={need._id} value={need.name} onClick={() => setUpdatedNeeds([...updatedNeeds, ...selectedNeeds])}>
                    {need.name}
                  </option>
                ))}
              </select>
              </div>
            
            <button
              className="px-4 py-2 bg-custom-blue hover:bg-custom-blue-dark text-white rounded mt-4"
              onClick={handleUpdateNeeds}
            >
              Add new need
            </button>
          </Modal>
          </div>
        </div>
      </div>
    ) : null}

    {isEditMode ? (
      <button  className="px-4 py-2 bg-custom-blue hover:bg-custom-blue-dark text-white rounded" onClick={handleUpdateProfile}>Save Profile</button>
    ) : (
      
      <button className="px-4 py-2 bg-custom-blue hover:bg-custom-blue-dark text-white rounded" onClick={() => setIsEditMode(!isEditMode)}>Edit Profile</button>
    )}
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
          background: '#f9a03f',
          color: '#fff',
        },

    // Default options for specific types
  }}
/>
  </div>
);
};