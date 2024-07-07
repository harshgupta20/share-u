import React, { useEffect, useState } from "react";
import { deleteRequest, getRequest, postRequest } from "../utils/axios";
import { endpoints, website } from "../utils/constant";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {

  const [linkList, setLinkList] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [userInfo, setUserInfo] = useState();

  const [reRender, setReRender] = useState(false);

  const addLink = async (e) => {
    try{
      e.preventDefault();
      console.log(link, title)
      const response = await postRequest(endpoints.addLink, {link, title});
      setReRender(!reRender);
      alert(response.message);
    }
    catch(error){
      alert(error.message);
    }
  }

  const getLinks = async () => {
    try{
      // Logic to get all links
      const response = await getRequest(endpoints.getLinks);
      setLinkList(response.data);
    }
    catch(error){
      alert(error.message);
    }
  }
  
  const getUserInfo = async () => {
    getRequest(endpoints.getUser).then((response)=> {
      if(response.success){
        setUserInfo(response.data);
      }
    });
  }

  const deleteLink = async (linkId) => {
    try{
      const response = await deleteRequest(endpoints.deleteLink, linkId);
      setReRender(!reRender);
      alert(response.message);
    }
    catch(error){
      alert(error.message);
    }
  }

  
  useEffect(()=> {
    document.title = `Dashboard - ${website.TITLE}`
    getLinks();
    getUserInfo();
  },[reRender])

  return (
    <>
      <Banner />
      <Navbar/>
      <div className="grid mx-8 sm:grid-cols-2">
        <div className="h-screen p-3">
          <form onSubmit={addLink}>
            <div className="grid gap-4 grid-col-3 p-4">
              <label class="mb-2 text-lg block">Add Link</label>
              <input type="text" required placeholder="title" value={title} onChange={(e)=> setTitle(e.target.value)} class="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"/>
              <input type="text" required placeholder="link" value={link} onChange={(e)=> setLink(e.target.value)} class="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"/>
              <button type="submit" class="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-transparent text-white hover:text-blue-700 transition-all duration-300">Add</button>
            </div>
          </form>

          <h1 className="text-2xl mt-4 font-semibold m-4">All Links 🔗</h1>
          <div className="w-full flex flex-wrap">
            {/* javascript */}
            {
              linkList.length!=0 ? linkList.map((link, index) => (
                <div key={index} className="flex justify-between w-1/3 p-2 border-2 shadow-xl hover:animate-pulse">
                  <div className="overflow-x-hidden">
                      <h2 className="font-bold">{link.title}</h2>
                      <a className="w-full" href={link.link} target="blank" rel="noopener noreferrer">{link.link}</a>
                  </div>
                  <button onClick={() => deleteLink(link.id)} className="bg-red-700 text-white p-2 rounded-lg">X</button>
                </div> 
              ))
              :
              "No links found."
            }
         
          </div>

        </div>
        <div className="p-3 hidden sm:block">
          <h1 className="text-2xl font-semibold">Profile View</h1>

          {/* <p><a href={`${import.meta.env.VITE_FRONTEND_BASE_URL}/${userInfo?.username}`} target="blank">{import.meta.env.VITE_BACKEND_BASE_URL}/{userInfo?.username}</a></p> */}

          <div className="my-4 m-auto w-2/3 h-full border-4 border-gray-500 rounded-xl">
            <div className="flex justify-between items-center bg-gray-500 text-gray-300 rounded-t-md p-2 border-t-[35px] border-[15px] border-gray-700">
              <p className=""> <span>&#128269;</span> {import.meta.env.VITE_FRONTEND_BASE_URL}/{userInfo?.username}</p>
              <a href={`${import.meta.env.VITE_FRONTEND_BASE_URL}/${userInfo?.username}`} target="blank">
                <svg className=" w-5" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)" stroke="#ffffff" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.032"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" fill-rule="evenodd" d="M8 3.517a1 1 0 011.62-.784l5.348 4.233a1 1 0 010 1.568l-5.347 4.233A1 1 0 018 11.983v-1.545c-.76-.043-1.484.003-2.254.218-.994.279-2.118.857-3.506 1.99a.993.993 0 01-1.129.096.962.962 0 01-.445-1.099c.415-1.5 1.425-3.141 2.808-4.412C4.69 6.114 6.244 5.241 8 5.042V3.517zm1.5 1.034v1.2a.75.75 0 01-.75.75c-1.586 0-3.066.738-4.261 1.835a8.996 8.996 0 00-1.635 2.014c.878-.552 1.695-.916 2.488-1.138 1.247-.35 2.377-.33 3.49-.207a.75.75 0 01.668.745v1.2l4.042-3.2L9.5 4.55z" clip-rule="evenodd"></path></g></svg>
              </a>
            </div>
            <iframe className="bg-white grid place-items-center m-auto rounded-md rounded-t-none" width="100%" height="80%" src={`${import.meta.env.VITE_FRONTEND_BASE_URL}/${userInfo?.username}`} title="share pro"></iframe> 
          </div>
            
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
