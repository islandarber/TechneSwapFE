import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


export const OtherUserProfil = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const { token } = useAuth();
  const api_url = import.meta.env.VITE_BACKEND_URL; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponce = await axios.get(`${api_url}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setUser(userResponce.data);
        console.log("response after fetching Data",userResponce.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

  }, []);

  const handleContactClick = () => {
    const emailAddress = user.email; // Replace with your email address
    const subject = 'Inquiry from your TechneSwap';
    const body = 'Hello, I am interested in swapping skills with you.';

    const mailtoLink = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's default email client
    window.location.href = mailtoLink;
  };




  return (
    <section className="bg-blueGray-50">
      <button onClick={() => window.history.back()} className="bg-custom-orange text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ml-2 mt-4">Back</button>
      <div className="w-full flex justify-center lg:w-4/12 px-4 mx-auto mt-6"> {/* Adjusted mt-16 to mt-0 */}
      <div className="relative flex flex-col self-center min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg md:w-3/4 lg:w-1/2 xl:w-1/3">
          <div className="px-6 m-6">
            <div className="flex justify-center">
              <div className="relative">
                {user.img && (
                  <img
                  alt="Profile"
                  src={user.img ? user.img : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                  className="shadow-xl rounded-md h-auto w-auto max-h-45 max-w-45 md:max-h-60 md:max-w-60 lg:max-h-80 lg:max-w-80 xl:max-h-96 xl:max-w-96"
                />
                )}
              </div>
            </div>

            <div className="text-center mt-6"> {/* Adjusted mt-12 to mt-6 */}
              <h3 className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {user.firstName} {user.lastName}
              </h3>
              {user.location && (
              <span>
                <span role="img" aria-label="Location Emoji">
                  ⚲
                </span>{" "}
                {user.location}
              </span>
            ) }
              <div className="mb-2 text-blueGray-600 mt-2">
                <div className="w-full lg:w-9/12 px-4 mt-4">
                  <h3 className="text-lg font-bold leading-normal mb-2">
                    Needs:
                  </h3>
                  {user.needs && user.needs.length !== 0 ? (
                    <div className="list-disc flex gap-2 justify-center"> {/* Centered Needs list */}
                      {user.needs.map((need, index) => (
                        <p key={index} className='bg-custom-blue p-2 text-white rounded'>{need.name ? need.name : need}</p>
                      ))}
                    </div>
                  ) : (
                    <p>No needs specified</p>
                  )}
                </div>
              </div>
              <div className="mb-2 text-blueGray-600">
                <div className="w-full lg:w-9/12 px-4">
                  <h3 className="text-lg font-bold leading-normal mb-2 mb-2">
                    Skills:
                  </h3>
                  {user.skills && user.skills.length !== 0 ? (
                    <div className="list-disc flex items-center gap-2 justify-center"> {/* Centered Skills list */}
                      {user.skills.map((skill, index) => (
                        <p key={index} className='bg-custom-blue p-2 text-white rounded'>{skill.name ? skill.name : skill}</p>
                      ))}
                    </div>
                  ) : (
                    <p>No skills specified</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <h2 className='text-xl'>About me </h2>
                  <hr className="mx-auto w-1/6 my-2 h-2 bg-blueGray-200" />
                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    {user.description || "No bio specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                className="bg-custom-orange text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mb-6"
                onClick={handleContactClick}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
