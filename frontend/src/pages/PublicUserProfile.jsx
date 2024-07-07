import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../utils/axios';
import { endpoints } from '../utils/constant';

const PublicUserProfile = () => {
    const { username } = useParams();

    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {
      try{
        const response = await getRequest(endpoints.publicProfile, {username});
        if(response.success === false){
        }
        setProfile(response.data);
        setLoading(false);
      }
      catch(error){
        setLoading(false);
      }
    }

    useEffect(() => {
        // fetch user data based on username
        loadProfile();
    }, [])

    console.log(profile)


  return (
  <>
    {
      loading ?

      <div className='grid place-items-center h-screen'>
        <h1 className='text-4xl'>Loading...</h1>
      </div>

      :
      
      profile ?
      <div className='grid p-10'>
          <div className='flex items-center flex-col bg-gray-400 p-10'>
              <h1 className='text-4xl mb-10'>@{profile?.username}</h1>

              {
                profile?.links.length == 0 ? 
                <div className='grid place-items-center'>
                  <h1 className='text-4xl'>No links added yet.</h1>
                </div>
                :
                <ul className='w-11/12'>
                  {
                    profile?.links.map((link, key) => {
                      return <a key={key} href={link?.link}><li className='grid place-items-center bg-teal-400 p-3 my-2 rounded hover:bg-teal-700'>{link?.title}</li></a>
                    })
                  }
                </ul>
              }
          </div>
      </div>
      :
      <div className='grid place-items-center h-screen'>
        <h1 className='text-4xl'>Profile doesn't exist.</h1>
      </div>
    }


    <p className='flex justify-center w-screen'>Powered by <span className='text-teal-500'><a href={`${import.meta.env.VITE_FRONTEND_BASE_URL}`} target='blank'>Share Pro</a></span></p>
  </>
  )
}

export default PublicUserProfile