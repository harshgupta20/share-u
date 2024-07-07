import { endpoints, userRole } from "../utils/constant";
import { filterObject } from "../utils/filterObject";
import { postRequest } from "../utils/axios";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginStepper from "../components/LoginStepper";

export default () => {

    const {userInfo, setUserInfo} = useContext(LoginContext);

    const onLoginSubmit = async (e)=> {
        try{
            e.preventDefault();
            const registerFormData = {email: e.target[0].value, password: e.target[1].value};
            if(Object.keys(registerFormData).length == 0){
                throw new Error('Please fill all the fields');
            }
            const dataFilled = filterObject(['email', 'password'], registerFormData);    
          
            const response = await postRequest(endpoints.login, dataFilled);
          
            if(!response.success){
                throw new Error(response.message);
            }

            localStorage.setItem("token", response.data.token);
            alert(response.message);
            setUserInfo({email: response.data.email, role_id: response.data.role_id});
            if(response.data.role_id == userRole.ADMIN){
                window.location.href = "/admin/dashboard";
            }
            else{
                window.location.href = "/dashboard";
            }
        }
        catch(error){
            alert(error);
        }
    }

    return (
        <>
            <Banner />
            <Navbar/>

            <main className="w-full flex flex-col items-center justify-center px-4">
                <LoginStepper/>
            </main>

            <Footer />

</>
    )
}