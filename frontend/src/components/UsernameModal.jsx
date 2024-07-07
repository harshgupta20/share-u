import { useState } from "react";
import { putRequest } from "../utils/axios";
import { endpoints } from "../utils/constant";

export default ({ modal, setModal }) => {

    const [username, setUsername] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const confirmUsername = async (e) => {
        e.preventDefault();
        setErrorMessage();
        const response = await putRequest(endpoints.updateUser, { username });
        if (!response.success) {
            setErrorMessage(response.message);
        }
        else {
            setSuccessMessage("Your username is all set.")

            // Just close the modal after 2sec
            setTimeout(() => { setModal(false) }, 3000);
        }
    }

    return (
        <>
            {
                modal &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-blue-600" fill="#1c71d8" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 575.616 575.616" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M429.248,141.439C429.248,63.33,365.985,0,287.808,0c-78.109,0-141.439,63.33-141.439,141.439 c0,78.11,63.33,141.439,141.439,141.439C365.988,282.878,429.248,219.549,429.248,141.439z M181.727,144.499 c0,0-4.079-40.12,24.82-70.72c20.34,20.389,81.261,70.72,187.342,70.72c0,58.498-47.586,106.081-106.081,106.081 S181.727,202.994,181.727,144.499z"></path> <path d="M45.049,391.68v62.559v80.919c0,22.365,18.136,40.459,40.459,40.459h404.6c22.365,0,40.459-18.097,40.459-40.459v-80.919 V391.68c0-44.688-36.193-80.919-80.919-80.919H377.91c-5.07,0-11.46,3.422-14.271,7.639l-70.735,99.982 c-2.812,4.22-7.372,4.22-10.184,0l-70.738-99.986c-2.812-4.22-9.202-7.638-14.272-7.638h-71.742 C81.319,310.758,45.049,346.991,45.049,391.68z"></path> </g> </g> </g></svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Your Username ?</h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Tip: Choose a unique one which resonates with you.</p>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-700">Public Profile link would be : <span className="font-bold">{import.meta.env.VITE_FRONTEND_BASE_URL}/{username}</span></p>
                                            </div>
                                            <form onSubmit={confirmUsername}>
                                                <input name="username" onChange={(e) => { setUsername(e.target.value) }} className="p-2 border-2 border-gray-200 rounded-md my-4" type="text" placeholder="username" />
                                                <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Confirm</button>
                                            </form>

                                            {
                                                errorMessage && <div className="mt-2"><p className="text-sm text-red-500">{errorMessage}</p></div>
                                            }
                                            {
                                                successMessage && <div className="mt-2"><p className="text-sm text-green-500">{successMessage}</p></div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    );
};
