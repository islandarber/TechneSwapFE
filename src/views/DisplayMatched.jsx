import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Stylesheets/DisplayMatched.module.css';
import { useNavigate } from 'react-router-dom';



export const DisplayMatched = () => {

  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]);


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
    const fetchMatchedUsers = async () => {
      try {
        const reqBody = {
          excludeUserId: user._id,
          skills: user.skills,
          needs: user.needs,
        }
        const matchedresponse = await axios.get('http://localhost:8000/users', {
        params: reqBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Assuming matchedUsers is an array of users returned from the server
        const categorizedUsers = {
          both: [],
          skills: [],
          needs: [],
        };

        matchedresponse.data.forEach((matchedUser) => {
          const hasSkills = matchedUser.skills.some((skill) => user.needs.some((need) => skill.category === need.category));
          const hasNeeds = matchedUser.needs.some((need) => user.skills.some((skill) => need.category === skill.category));
          if (hasSkills && hasNeeds) {
            categorizedUsers.both.push(matchedUser);
          } else if (hasSkills) {
            categorizedUsers.needs.push(matchedUser);
          } else if (hasNeeds) {
            categorizedUsers.skills.push(matchedUser);
          }
        })


        setMatchedUsers(categorizedUsers);
        console.log(categorizedUsers);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMatchedUsers();
  }, []);



  return (
    <div>
      <h1>These are your matches</h1>
      <div className={style.results}>
        {matchedUsers.both && matchedUsers.both.map((user, index) => (
              <div key={index} className={style.result__userCard} onClick={()=>navigate(`/discover/${user._id}`)}>
            <div className={style.imgNameLocation}>
              <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="avatar" />
              <h2>{user.firstName}</h2>
              <p>📍{user.location}</p>
            </div>
            <div className={style.skillsNeeds}>
              <h3>Skills</h3>
              <ul>
                {user.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div className={style.skillsNeeds}>
              <h3>Needs</h3>
              <ul>
                {user.needs.map((need, index) => (
                  <li key={index}>{need.name}</li>
                ))}
              </ul>
            </div>
            <p className={style.matchedBoth}>Matched both your skills and needs!</p>
          </div>
        ))}
        {matchedUsers.skills && matchedUsers.skills.map((user, index) => (
          <div key={index} className={style.result__userCard} onClick={()=>navigate(`/discover/${user._id}`)}>
            <div className={style.imgNameLocation}>
              <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="avatar" />
              <h2>{user.firstName}</h2>
              <p>📍{user.location}</p>
            </div>
            <div className={style.skillsNeeds}>
              <h3>Skills</h3>
              <ul>
                {user.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div className={style.skillsNeeds}>
              <h3>Needs</h3>
              <ul>
                {user.needs.map((need, index) => (
                  <li key={index}>{need.name}</li>
                ))}
              </ul>
            </div>
            <p className={style.matchedSkills}>Matched your Skills!</p>
          </div>
        ))}
        {matchedUsers.needs && matchedUsers.needs.map((user, index) => (
          <div key={index} className={style.result__userCard} onClick={()=>navigate(`/discover/${user._id}`)}>
            <div className={style.imgNameLocation}>
              <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="avatar" />
              <h2>{user.firstName}</h2>
              <p>📍{user.location}</p>
            </div>
            <div className={style.skillsNeeds}>
              <h3>Skills</h3>
              <ul>
                {user.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div className={style.skillsNeeds}>
              <h3>Needs</h3>
              <ul>
                {user.needs.map((need, index) => (
                  <li key={index}>{need.name}</li>
                ))}
              </ul>
            </div>
            <p className={style.matchedNeeds}>Matched your Needs!</p>
          </div>
        ))}
      </div>
    </div>
  );
  
}
