import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DisplayMatched = () => {
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, token } = useAuth();
  

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      try {
        const reqBody = {
          skills: user.skills,
          needs: user.needs,
        };

        const matchedresponse = await axios.get('http://localhost:8000/users', {
          params: reqBody,
          headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`,
          },
        });

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
        });

        setMatchedUsers(categorizedUsers);
        console.log(categorizedUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchedUsers();
  }, []);

  return (
    <>
    {loading ? <p className="text-m text-custom-blue font-bold mb-2">Loading...</p> :
      <>
      {matchedUsers ?
      <div className='flex flex-col items-center gap-2 mt-5'>
        <button className='bg-custom-blue rounded p-2 text-sm text-white' onClick={() => navigate('/user')}>Update your Profile</button>
        <h1 className="text-2xl text-center text-custom-blue font-bold mt-9 mb-4">Your matches:</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 m-7">
          {matchedUsers.both && matchedUsers.both.map((user, index) => (
            <div
              key={index}
              className="bg-white p-2 md:p-4 shadow-xl rounded-md cursor-pointer hover:shadow-lg transition duration-300"
              onClick={() => navigate(`/discover/${user._id}`)}
            >
              <div className="mb-4">
                <img
                  src={user.img ? user.img : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                  alt={user.name}
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
                <h2 className="text-xl font-bold text-custom-orange mb-2">{user.firstName}</h2>
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
                  <h3 className="text-m text-custom-blue font-bold mb-2">Needs</h3>
                  <ul>
                  {user.needs && user.needs.length !== 0 ?
                    user.needs.map((need, index) => (
                      <li key={index}>{need.name ? need.name : need}</li>
                    ))
                  : <p>No needs specified</p>}
                </ul>
                </div>
                <p className="text-custom-purple text-sm mt-2">
                  Matched your skills and needs!
                </p>
              </div>
            </div>
          ))}
          {matchedUsers.skills && matchedUsers.skills.map((user, index) => (
            <div
              key={index}
              className="bg-white p-2 md:p-4 shadow-xl rounded-md cursor-pointer hover:shadow-lg transition duration-300"
              onClick={() => navigate(`/discover/${user._id}`)}
            >
              <div className="mb-4">
                <img
                  src={user.img ? user.img : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                  alt={user.name}
                  className="w-full h-24 object-cover rounded-md"
                />
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
                  <h3 className="text-m text-custom-blue font-bold mb-2">Skills</h3>
                  <ul>
                  {user.skills && user.skills.length !== 0?
                    user.skills.map((skill, index) => (
                      <li key={index}>{skill.name ? skill.name : skill}</li>
                    ))
                  : <p>No skills specified</p>}
                </ul>
                </div>
                <div className="mt-4">
                  <h3 className="text-m text-custom-blue font-bold mb-2">Needs</h3>
                  <ul>
                    {user.needs.map((need, index) => (
                      <li key={index}>{need.name}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-green-600 text-sm mt-2">
                  Matched your Skills!
                </p>
              </div>
            </div>
          ))}
          {matchedUsers.needs && matchedUsers.needs.map((user, index) => (
            <div
              key={index}
              className="bg-white p-2 md:p-4 shadow-xl rounded-md cursor-pointer hover:shadow-lg transition duration-300"
              onClick={() => navigate(`/discover/${user._id}`)}
            >
              <div className="mb-4">
                <img
                  src={user.img ? user.img : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                  alt={user.name}
                  className="w-full h-24 object-cover rounded-md"
                />
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
                <p className="text-blue-600 text-sm mt-2">
                  Matched your Needs!
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      : <p className="text-center text-2xl text-custom-blue font-bold mt-9">No matches found</p>}
      {user.skills && user.skills.length === 0 && <p className="text-center text-xl text-custom-orange mt-9"> Please update your skills. </p>}
      {user.needs && user.needs.length === 0 && <p className="text-center text-xl text-custom-orange mt-9"> Please update your needs. </p>}
      </>
      }
    </>
  );
};
