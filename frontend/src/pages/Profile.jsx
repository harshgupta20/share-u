import { useEffect, useState } from 'react'
import { endpoints, website } from '../utils/constant'
import { getRequest } from '../utils/axios';
import Badge from '../components/Badge';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {

  const [userInfo, setUserInfo] = useState();

  const getUserInfo = async () => {
    getRequest(endpoints.getUser).then((response)=> {
      if(response.success){
        setUserInfo(response.data);
      }
    });
  }

  useEffect(()=> {
    document.title = `Profile - ${website.TITLE}`
    getUserInfo();
  },[])

  return (
    <>
            <Banner />
            <Navbar/>
        <div className="max-w-screen-xl mt-20 mx-auto px-4 md:px-8">
         <div class="px-4 sm:px-0">
           <h3 class="text-base font-semibold leading-7 text-gray-900">Your Profile</h3>
           {/* <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p> */}
         </div>
         <div class="mt-6 border-t border-gray-100">
           <dl class="divide-y divide-gray-100">
             <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
               <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
               <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo?.name}</dd>
             </div>
             <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
               <dt class="text-sm font-medium leading-6 text-gray-900">Username</dt>
               <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo?.username}</dd>
             </div>
             <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
               <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
               <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo?.email}</dd>
             </div>
             <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
               <dt class="text-sm font-medium leading-6 text-gray-900">Profile Completion Status</dt>
               <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo?.is_profile_completed==true ? <Badge text="Completed" type="success"/> : <Badge text="Not Completed" type="warning"/>}</dd>
             </div>
           </dl>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg> */}
            Save Changes
          </button>
        </div>
        <Footer />
    </>
  )
}

export default Profile;