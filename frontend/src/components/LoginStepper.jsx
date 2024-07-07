import React, { useState } from 'react'
import { postRequest } from '../utils/axios';
import { endpoints } from '../utils/constant';

const LoginStepper = () => {

    const [showOtpWindow, setShowOtpWindow] = useState(false);
    const [email, setEmail] = useState('');
    const [disable, setDisable] = useState(false);

    const getOtpOnEmail = async (e) => {
        try{
            setDisable(true);
            e.preventDefault();
            const response = await postRequest(endpoints.getOtpOnEmail, {email: e.target.email.value});
            setEmail(e.target.email.value);
            if(!response.success){
                alert(response.message);
            }
            else{
                alert(response.message);
                setShowOtpWindow(true);
            }

            setDisable(false);
        }
        catch(error){
            setDisable(false);
            alert(error.message);
        }
    }

    const verifyOtp = async (e) => {
        try{
            setDisable(true);
            e.preventDefault();
            const response = await postRequest(endpoints.verifyOtpForEmail, {email, otp: e.target.otp.value});
            if(!response.success){
                alert(response.message);
            }
            else{
                localStorage.setItem('token', response.data.token);
                //write a code redirect to dashboard
                window.location.href = '/dashboard';
                alert(response.message);
            }

            setDisable(false);
        }
        catch(error){
            setDisable(false);
            alert(error.message);
        }
    }

  return (
    <>
        <div className='sm:w-1/2 w-11/12 m-auto p-4'>
        {
            showOtpWindow ? 
   
                    <main class="w-full flex flex-col items-center justify-center px-4">
                    <button onClick={()=> {setShowOtpWindow(false)}} className='w-fit text-left bg-indigo-600 text-white p-1 rounded-md'> {'<'} Back</button>
                        <div class="max-w-sm w-full text-gray-600 space-y-8">
                            <div class="text-center">
                                {/* <img src="https://floatui.com/logo.svg" width="150" class="mx-auto" /> */}
                                <div class="mt-5 space-y-2">
                                    <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">Log with OTP</h3>
                                </div>
                            </div>
                            <form onSubmit={verifyOtp}>
                                <div>
                                    <label class="font-medium"> Enter OTP </label>
                                    <input type="text" name='otp' autoFocus required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
                                </div>
                                {disable && <p class="text-green-500">Verifying...</p>}
                                {disable != true && <button  class="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">Verify</button>}
                            </form>
                        </div>
                    </main>
                :
                    <main class="w-full flex flex-col items-center justify-center px-4">
                        <div class="max-w-sm w-full text-gray-600 space-y-8">
                            <div class="text-center">
                                {/* <img src="https://floatui.com/logo.svg" width="150" class="mx-auto" /> */}
                                <div class="mt-5 space-y-2">
                                    <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">Log with OTP</h3>
                                </div>
                            </div>
                            <form onSubmit={getOtpOnEmail}>
                                <div>
                                    <label class="font-medium"> Email </label>
                                    <input type="email" name='email' autoFocus required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
                                </div>
                                {disable && <p class="text-red-500">Please wait...</p>}
                                {disable != true && <button  class="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">Send</button>}
                            </form>
                        </div>
                    </main>
        }
        </div>
    </>
  )
}

export default LoginStepper