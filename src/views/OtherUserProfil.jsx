import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


export const OtherUserProfil = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      }finally {
        setLoading(false);
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
    <>
      {loading ?<div role="status" className="flex items-start justify-center h-screen mt-10">
      <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span class="sr-only">Loading...</span>
      </div> 
      : <section className="bg-blueGray-50">
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
                      <div className="list-disc flex flex-wrap gap-2 justify-center"> {/* Centered Needs list */}
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
                      <div className="list-disc flex flex-wrap items-center gap-2 justify-center"> {/* Centered Skills list */}
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
      </section>}
    </>
  );
}
