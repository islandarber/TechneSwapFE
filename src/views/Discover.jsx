import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Stylesheets/Discover.module.css';
import { DisplayMatched } from './DisplayMatched';
import {NavbarDiscover} from './NavbarDiscover';
import { useNavigate } from 'react-router-dom';




export const Discover = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  const [showAll, setShowAll] = useState(true);

  const [loading, setLoading] = useState(false);

  const [errorgeneral, setErrorgeneral] = useState(null);
  const [errorResults, setErrorResults] = useState(null);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    field: "",
    keyword: ""
  });

  const user = {
    _id:"65dcaeda6e111616d6f31868",
    firstName:"Christina",
    lastName:"Vekri",
    needs:[{_id: "65dda9f505218afefe6258d1", name: "Python", category: "65dda850a018265f548e750a",},{ _id: "65ddaa0d05218afefe6258d7", name: "Spanish", category: "65dda86eca551a54770d8848", }],
    skills:[{_id: "65dda9ac05218afefe6258ce", name: "Javascript", category: "65dda850a018265f548e750a",},{ _id: "65ddaa0105218afefe6258d4", name: "English", category: "65dda86eca551a54770d8848",}],
    visibility:true,
    location:"Berlin, Germany"
  }

  useEffect(() => {
    const fetchData = async () => {
    try {
      setLoading(true);
      const categoryresponse = await axios.get('http://localhost:8000/categories');
      const userAllResponce = await axios.get('http://localhost:8000/users');
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
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/users?${queries.join('&')}`);
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
      <NavbarDiscover setShowAll={setShowAll} />
      {showAll ? <div className={style.discoverViewAll}>
        <h1>Discover the world of TechneSwap!</h1>
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
          <h1>Results</h1>
          <div className={style.results}>
            {errorResults ? <p>{errorResults.message}</p> : loading ? <p>Loading...</p> :
            allUsers ? allUsers.map((user, index) => {
                return (
                  <div key={index} className={style.result__userCard} onClick={()=>navigate(`/discover/${user._id}`)}>
                    <div className={style.imgNameLocation}>
                      {user.img ? <img src={user.img} alt={user.name} /> 
                      :<img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="avatar" />}
                      <h2>{user.firstName}</h2>
                      <p>📍{user.location}</p>
                    </div>
                    <div className={style.skillsNeeds}>
                      <h3>Skills</h3>
                      { user.skills && user.skills.map((skill, index) => (
                        <li key={index}>{skill.name ? skill.name : skill}</li>
                      ))}

                    </div>
                    <div className={style.skillsNeeds}>
                    <h3>Needs</h3>
                      {user.needs && user.needs.map((need, index) => {
                        return <li key={index}>{need.name ?need.name : need}</li>
                      })}
                    </div>
                  </div>
                )
              })
              : <p>No results</p>
            }
          </div>
        </div>
      </div>
      : <DisplayMatched setShowAll={setShowAll} />
}
    </div>
  )
}
