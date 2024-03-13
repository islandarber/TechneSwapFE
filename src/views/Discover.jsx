import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Stylesheets/Discover.module.css';
import { DisplayMatched } from './DisplayMatched';
import {NavbarDiscover} from './NavbarDiscover';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';




export const Discover = () => {
  const {user, token, showAll, setShowAll } = useAuth();

  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  

  const [loading, setLoading] = useState(false);

  const [errorgeneral, setErrorgeneral] = useState(null);
  const [errorResults, setErrorResults] = useState(null);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    field: "",
    keyword: ""
  });

  const api_url = import.meta.env.VITE_BACKEND_URL;

  const fetchData = async () => {
    console.log("im inside get users general")
    try {
      setLoading(true);
      const categoryresponse = await axios.get(`${api_url}/categories`);
      const userAllResponce = await axios.get(`${api_url}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setAllUsers(userAllResponce.data);
      console.log("response after fetching Data",userAllResponce.data);
      setCategories(categoryresponse.data);
    } catch (error) {
      if (error.response) {
        setErrorgeneral(error.response.data);
      } else {
        setErrorgeneral(error);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  

  const handleSearch =  (e) => {
    setErrorResults(null);
    e.preventDefault();
    const queries = [];
    if (formData.category) {
      queries.push(`category=${formData.category}`);
    }
    if (formData.field && formData.field!== "all") {

      queries.push(`field=${formData.field}`);

    }
    if (formData.keyword) {
      queries.push(`keyword=${formData.keyword}`);
    }
    const fetchUsers = async () => {
      console.log("im inside get users with filters")
      try {
        setLoading(true);
        const response = await axios.get(`${api_url}/users?${queries.join('&')}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        
        });
        setAllUsers(response.data);
        console.log("response after fetching Data",response.data);
      } catch (error) {
        if (error.response) {
          setErrorResults(error.response.data);
        } else {
          setErrorgeneral(error);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }

  const handleChange = (e) => {
    if (e.target.type === 'radio') {
      setFormData({ ...formData, field: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  
  

  return (
    <div>
      <NavbarDiscover/>
      {showAll ? <>
        <div className={style.discoverViewAll}>
          <h1 className='mx-4'>Discover the world of TechneSwap!</h1>
          <form onSubmit={handleSearch}>
            <div className={style.category__selector}>
              <select name="category" id="category" onChange={handleChange}>
                <option value="">All</option>
                {categories && categories.map((category, index) => {
                  return <option key={index} value={category.name}>{category.name}</option>
                })}
              </select>
            </div>
            <div className={style.radio__selectors}>
              <label htmlFor="skills">Skills</label>
              <input
                type="radio"
                id="skills"
                name="field"
                value="skills"
                checked={formData.field === "skills"}
                onChange={handleChange}
              />
              <label htmlFor="needs">Needs</label>
              <input
                type="radio"
                id="needs"
                name="field"
                value="needs"
                checked={formData.field === "needs"}
                onChange={handleChange}
              />
              <label htmlFor="all">All</label>
              <input
                type="radio"
                id="all"
                name="field"
                value="all"
                checked={formData.field === "all"}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="keyword"></label>
            <input type="text" id='keyword' name='keyword' placeholder='keyword' value={formData.keyword} onChange={handleChange}/>
            <button type="submit">Search</button>
          </form>
          </div>
          <h1 className="text-2xl text-center text-custom-blue font-bold mt-4 mb-4">Results :</h1>
          <div>
            {errorResults ? (
        <div className="col-span-full text-center">
        <p className="text-red-500">{errorResults.message}</p>
            </div>
            ) : loading ? (
            <div role="status" className="flex justify-center">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
            ) : allUsers ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 m-12 md:mx-32 xl:mx-32" >
        {allUsers.map((user, index) => (
          <div
            key={index}
            className="bg-white p-4 md:p-4 shadow-xl rounded-md cursor-pointer hover:scale-105 transition duration-300"
            onClick={() => navigate(`/discover/${user._id}`)}
          >
            <div className="mb-4">
              {user.img ? (
                <img
                src={user.img}
                alt={user.name}
                className="w-full h-40 sm:h-40 md:h-28 lg:h-28 xl:h-28 object-cover rounded-md"
              />
              ) : (
                <img
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  alt="avatar"
                  className="w-full h-40 sm:h-40 md:h-20 lg:h-20 xl:h-20 object-cover rounded-md"
                />
              )}
            </div>
            <h2 className="text-xl font-bold text-custom-orange mb-2">{user.firstName}</h2>
            <p className="text-gray-600">
              {user.location ? (
                <span>
                  <span role="img" aria-label="Location Emoji">
                    ⚲
                  </span>{" "}
                  {user.location}
                </span>
              ) : (
                "No location specified"
              )}
            </p>
            <div className="mt-4">
              <div>
                <h3 className="text-m text-custom-blue font-bold mb-2">Skills:</h3>
                <ul>
                  {user.skills && user.skills.length !== 0?
                    user.skills.map((skill, index) => (
                      <li key={index}>{skill.name ? skill.name : skill}</li>
                    ))
                  : <p>No skills specified</p>}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-m text-custom-blue font-bold mb-2">Needs:</h3>
                <ul>
                  {user.needs && user.needs.length !== 0 ?
                    user.needs.map((need, index) => (
                      <li key={index}>{need.name ? need.name : need}</li>
                    ))
                  : <p>No needs specified</p>}
                </ul>
              </div>
            </div>
          </div>
        ))}
        </div>
            ) : (
        <p>No results</p>
            )}
          </div>
      </>

      
      : <DisplayMatched setShowAll={setShowAll} />
}
    </div>
  )
}
