import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Stylesheets/UserProfile.module.css';
import Modal from '../components/Modal';
import toast, {Toaster} from 'react-hot-toast'
import { useAuth } from '../context/AuthContext';

export const UserProfil = () => {
  const {user, token} = useAuth();

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

  
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8000/users/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const categoriesResponse = await axios.get('http://localhost:8000/categories');

        setCategories(categoriesResponse.data);
        setUserData({
          firstName: userResponse.data.firstName,
          lastName: userResponse.data.lastName,
          email: userResponse.data.email,
          location: userResponse.data.location,
          description: userResponse.data.description,
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
    formData.append('description', userData.description);
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
    <div className='flex flex-col items-center justify-center mt-4' >
    {loading ? <p>Loading...</p> : userData ? (
      <div className='flex flex-col items-center justify-center'>
         {userData.img ? (
      <img
      src={typeof userData.img === 'string' ? userData.img : URL.createObjectURL(userData.img)}
      alt={userData.firstName}
      className="h-32 w-32 object-cover rounded-md"
    />
      ) : (
      <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="avatar" width={200} className="h-32 w-32 object-cover rounded-sm" />
      )}
   
          {isEditMode ? (
            <div className="max-w-md mx-auto p-4 rounded-md">
            <label className="block mb-1 text-xs font-bold text-gray-600">Profile Picture</label>
            <input
              name="img"
              type="file"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mb-2 rounded-md focus:outline-none focus:border-orange-500"
            />
          
            <label className="block mb-1 text-xs font-bold text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              defaultValue={userData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mb-2 rounded-md focus:outline-none focus:border-orange-500"
            />
          
            <label className="block mb-1 text-xs font-bold text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={userData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mb-2 rounded-md focus:outline-none focus:border-orange-500"
            />
          
            <label className="block mb-1 text-xs font-bold text-gray-600">Email</label>
            <input
              type="text"
              name="email"
              defaultValue={userData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mb-2 rounded-md focus:outline-none focus:border-orange-500"
            />
          
            <label className="block mb-1 text-xs font-bold text-gray-600">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={userData.location}
              placeholder="Add your location"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mb-2 rounded-md focus:outline-none focus:border-orange-500"
            />

            <label htmlFor="description">About me :</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              defaultValue={userData.description}
              className="w-full border border-gray-300 p-2 mb-2 rounded-md focus:outline-none focus:border-orange-500"
              onChange={handleChange}></textarea>
          </div>
          
          
            
          ) : (
            <div className='flex flex-col items-center text-2xl mb-4 mt-4'>
            <p className='mb-2 text-custom-blue-dark font-bold'>{userData.firstName}</p>
            <p className='mb-2 text-custom-blue-dark font-bold'>{userData.lastName}</p>
            <p className='mb-2 text-custom-blue-dark text-base'><span>
                <span role="img" aria-label="Location Emoji">
                  ⚲
                </span>{" "}
                {userData.location}
              </span></p>
            <p className='mb-2 text-custom-blue-dark text-base'>{userData.email}</p>
            <p className='mb-2 text-center text-custom-blue-dark m-6 text-base'>{userData.description}</p>
          </div>

          )}
        {/* Skills management */}
        <div className='flex flex-col items-center mt-4'>
          <h5 className='font-bold text-lg ml-1'>Your skills :</h5>
            <div>
              <div className='flex flex-wrap gap-2 mt-1 justify-center'>
              {userData.skills && userData.skills.length > 0 ? (
                userData.skills.map((skill, index) => (
                  <div key={index} className="flex bg-custom-blue hover:bg-custom-blue-dark text-white items-center px-2 py-2 rounded ml-1">
                    <p>{skill.name}</p>
                    {isEditMode && <button onClick={() => handleDeleteSkillAl(skill)} className="border border-white bg-custom-blue text-white ml-2 px-2 py-0 rounded">X</button>}
                  </div>
                ))
              ) : (
                <p>No skills added</p>
              )}
            </div>

            {isEditMode ? (
            <div className="flex justify-center"> {/* Add this div for centering */}
              <button className="mt-3 px-2 py-1 bg-custom-orange hover:bg-custom-orange-dark text-white rounded focus:outline-none focus:border-custom-orange" onClick={() => setIsModalSkillsOpen(true)}>
                Add new skill
              </button>
            </div>
          ) : null}

            
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
        <div className='flex flex-col items-center mt-4'>
          <h5 className='font-bold text-lg ml-1'>Your needs :</h5>
          <div className='flex flex-wrap gap-2 mt-1'>

            {userData.needs && userData.needs.length > 0 ? (
              userData.needs.map((need, index) => (
                <div key={index} className="flex bg-custom-blue hover:bg-custom-blue-dark text-white items-center px-2 py-2 rounded ml-1">

                  <p>{need.name}</p>
                  {isEditMode ? <button onClick={() => handleDeleteNeedAl(need)} className="border border-white bg-custom-blue text-white ml-2 px-2 py-0 rounded">X</button> : null}
                </div>
              ))
            ) : (
              <p>No needs added</p>
            )}
            </div>


          {isEditMode ? (
              <button className="mt-3 px-2 py-1 bg-custom-orange hover:bg-custom-orange-dark text-white rounded focus:outline-none focus:border-custom-orange ml-1" onClick={() => setIsModalNeedsOpen(true)}>
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
                  <option key={need._id} value={need.name} onClick={() => setUpdatedNeeds([...updatedNeeds, ...selectedNeeds])} disabled={userData.needs.some((userNeed) => userNeed.name === need.name)}>
                    {need.name}
                  </option>
                ))}
              </select>
              </div>
            
            <button
              className={`px-4 py-2 bg-custom-blue hover:bg-custom-blue-dark text-white rounded mt-4 ${
                selectedNeeds.length === 0 ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={handleUpdateNeeds}
              disabled={selectedNeeds.length === 0}
            >
              Add new need
            </button>
          </Modal>
          </div>
        </div>
      </div>
    ) : null}

    {isEditMode ? (
      <button  className="w-1/3 mt-9 px-3 py-1 bg-custom-orange hover:bg-custom-blue-dark text-white rounded  mb-6" onClick={handleUpdateProfile}>Save Profile</button>
    ) : (
      
      <button className="w-1/3 mt-8 mb-4 px-3 py-1 bg-custom-orange hover:bg-custom-blue-dark text-white rounded" onClick={() => setIsEditMode(!isEditMode)}>Edit Profile</button>
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