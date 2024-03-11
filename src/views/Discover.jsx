import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Stylesheets/Discover.module.css';
import { DisplayMatched } from './DisplayMatched';
import {NavbarDiscover} from './NavbarDiscover';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';




export const Discover = () => {
  const {user, token } = useAuth();

  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  const [showAll, setShowAll] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errorgeneral, setErrorgeneral] = useState(null);
  const [errorResults, setErrorResults] = useState(null);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    field: "",
    keyword: ""
  });

  const fetchData = async () => {
    console.log("im inside get users general")
    try {
      setLoading(true);
      const categoryresponse = await axios.get('http://localhost:8000/categories');
      const userAllResponce = await axios.get('http://localhost:8000/users', {
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
        const response = await axios.get(`http://localhost:8000/users?${queries.join('&')}`, {
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
      <NavbarDiscover setShowAll={setShowAll}/>
      {showAll ? <div className={style.discoverViewAll}>
        <h1 className='mx-4'>Discover the world of TechneSwap!</h1>
        <form onSubmit={handleSearch}>
          <div className={style.category__selector}>
            <label htmlFor="category">Category:</label>
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
        <div>
  <h1 className="text-2xl font-bold mb-4">Results</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 m-3">
    {errorResults ? (
      <p className="text-red-500">{errorResults.message}</p>
    ) : loading ? (
      <p>Loading...</p>
    ) : allUsers ? (
      allUsers.map((user, index) => (
        <div
          key={index}
          className="bg-white p-2 md:p-4 shadow-xl rounded-md cursor-pointer hover:shadow-lg transition duration-300"
          onClick={() => navigate(`/discover/${user._id}`)}
        >
          <div className="mb-4">
            {user.img ? (
              <img
                src={user.img}
                alt={user.name}
                className="w-full h-24 object-cover rounded-md"
              />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                alt="avatar"
                className="w-full h-24 object-cover rounded-md"
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
      ))
    ) : (
      <p>No results</p>
    )}
  </div>
</div>

      </div>
      : <DisplayMatched setShowAll={setShowAll} />
}
    </div>
  )
}
