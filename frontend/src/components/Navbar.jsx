import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { userRole } from '../utils/constant';

const Navbar = () => {

    const [state, setState] = useState(false);
    const {userInfo, setUserInfo} = useContext(LoginContext);

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { key: "title", title: "About ✨", path: "/about" },
        { key: "monetize", title: "Monetize 💲", path: "/monetize" },
        // { key: "team", title: "Team 👨‍🎨", path: "/team" },
        // { key: "pricing", title: "Pricing 🎁", path: "/pricing" },
        { key: "adminDashboard", title: "Admin Dashboard 🎮", path: "/admin/dashboard" },
        { key: "dashboard", title: "Dashboard 🎮", path: "/dashboard" },
        { key: "profile", title: "Profile 😎", path: "/profile" },
    ]

    const logoutUser = () => {
        localStorage.removeItem("token");
        setUserInfo({});
        alert("You are logged out!");
        window.location.href = "/";
    }

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])


    const Brand = () => (
        <div className="flex items-center justify-between py-5 md:block">
            <Link to="/">
                {/* <img
                    src="https://www.floatui.com/logo-dark.svg"
                    width={120}
                    height={50}
                    alt="Float UI logo"
                /> */}
                <p className='text-white text-3xl'>Share Pro</p>
            </Link>
            <div className="md:hidden">
                <button className="menu-btn text-gray-400 hover:text-gray-300"
                    onClick={() => setState(!state)}
                >
                    {
                        state ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )
                    }
                </button>
            </div>
        </div>
    )

  return (
    <>
        <header className='bg-gray-800'>
                <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
                    <Brand />
                </div>
                <nav className={`md:text-sm ${state ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent" : ""}`}>
                    <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                        <Brand />
                        <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                            <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                                {
                                    navigation.map((item, idx) => {
                                        return (
                                        <>
                                            {
                                                (item.key == "adminDashboard" || item.key == "dashboard") ? 
                                                    (item.key == "adminDashboard" && userInfo?.role_id == userRole.ADMIN) ?
                                                        <li key={idx} className="text-gray-300 hover:text-gray-400">
                                                            <Link to={item.path} className="block">
                                                                {item.title}
                                                            </Link>
                                                        </li>
                                                    :
                                                    (item.key == "dashboard" && userInfo?.role_id == userRole.USER) ?
                                                        <li key={idx} className="text-gray-300 hover:text-gray-400">
                                                            <Link to={item.path} className="block">
                                                                {item.title}
                                                            </Link>
                                                        </li>
                                                    : ""
                                                    : 
                                                    (item.key == "profile") ?
                                                        (userInfo?.email) ? <li key={idx} className="text-gray-300 hover:text-gray-400">
                                                             <Link to={item.path} className="block">
                                                                {item.title}
                                                            </Link>
                                                        </li>
                                                    : ""
                                                : 
                                                 <li key={idx} className="text-gray-300 hover:text-gray-400">
                                                     <Link to={item.path} className="block">
                                                         {item.title}
                                                     </Link>
                                                 </li>
                                            }   
                                        </>
                                        )
                                    })
                                }
                                <li>

                                {!userInfo?.email && 
                                    <Link to="/login" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex">
                                        Let me In!
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                }
                                {
                                    userInfo?.email && 
                                        <p onClick={logoutUser} style={{cursor: "pointer"}} className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 duration-150 rounded-full md:inline-flex">
                                            Logout 🚪
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                            </svg>
                                        </p>
                                }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
    </>
  )
}

export default Navbar