import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const DisplayMatched = () => {
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]);

  const user = {
    _id: "65dcaeda6e111616d6f31868",
    firstName: "Christina",
    lastName: "Vekri",
    needs: [{ _id: "65dda9f505218afefe6258d1", name: "Python", category: "65dda850a018265f548e750a" }, { _id: "65ddaa0d05218afefe6258d7", name: "Spanish", category: "65dda86eca551a54770d8848" }],
    skills: [{ _id: "65dda9ac05218afefe6258ce", name: "Javascript", category: "65dda850a018265f548e750a" }, { _id: "65ddaa0105218afefe6258d4", name: "English", category: "65dda86eca551a54770d8848" }],
    visibility: true,
    location: "Berlin, Germany"
  };

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      try {
        const reqBody = {
          excludeUserId: user._id,
          skills: user.skills,
          needs: user.needs,
        };

        const matchedresponse = await axios.get('http://localhost:8000/users', {
          params: reqBody,
          headers: {
            'Content-Type': 'application/json',
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
      }
    };

    fetchMatchedUsers();
  }, []);

  return (
    <div>
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
  );
};
