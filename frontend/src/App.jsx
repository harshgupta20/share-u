import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { LoginContext } from "./context/LoginContext";
import { useEffect, useState } from "react";
import { getRequest } from "./utils/axios";
import { endpoints } from "./utils/constant";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Team from "./pages/Team";
import Monetize from "./pages/Monetize";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import PublicUserProfile from "./pages/PublicUserProfile";
import UsernameModal from "./components/UsernameModal";

function App() {
  const [userInfo, setUserInfo] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
      checkLocalForToken(setUserInfo, setModal);
  },[]);

  return (
    <>
      <LoginContext.Provider value={{userInfo, setUserInfo}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/monetize" element={<Monetize />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />

          {/* This route should be written in last after all the route. */}
          <Route path="/:username" element={<PublicUserProfile />} />
        </Routes>
      </LoginContext.Provider>

      {/* Username existance check */}
      <UsernameModal modal={modal} setModal={setModal}/>
    </>
  );
}

async function checkLocalForToken(setUserInfo, setModal){
  try{
    const token = localStorage.getItem("token");

    if(token){
      const response = await getRequest(endpoints.getUser, {});
      if(response.success){
        console.log(response);
        setUserInfo({email: response.data.email, role_id: response.data.role_id});
        if(!response.data.username){
          setModal(true);
        }
      }
      else{
        alert("Invalid token");
        localStorage.removeItem("token");
      }
    }
    return false;
  }
  catch(error){
    alert("Something went wrong !", error.message);
    return false;
  }
}

export default App;
