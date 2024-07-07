import { useEffect, useState } from "react"
import { getRequest } from "../utils/axios"
import { endpoints } from "../utils/constant";
import { ErrorAlert } from "./Alerts";
import UserAddEditModal from "./UserAddEditModal";
import DeleteModalWarning from "./DeleteModalWarning";

export default () => {

    const [usersList, setUsersList] = useState([]);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const getUsersData = async () => {
        try{
            setLoading(true);
            const response = await getRequest(endpoints.AdminAllUsers, {});
            if(!response.success){
                throw new Error(response.message)
            }

            setUsersList(response.data);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
            setErrorAlertVisible(true);
        }
    }
    
    useEffect(() => {
        getUsersData();
    }, [])
    
    return (
        <>
            {
                errorAlertVisible && <ErrorAlert errorAlertVisible={errorAlertVisible} setErrorAlertVisible={setErrorAlertVisible} title="Failed to fetch user info."/>
            }
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Platform Users
                    </h3>
                    {/* <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p> */}
                </div>
                <div className="mt-3 md:mt-0">
                    <a
                        href="javascript:void(0)"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                        <UserAddEditModal modalType={"add"}/>
                    </a>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">User</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Role</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            !loading ? usersList.length > 0 ?
                            usersList.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                        <img src={item.avatar} className="w-10 h-10 rounded-full" alt={`${item.name}_pic`} />
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.role_id}</td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td> */}
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <a href="javascript:void()" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        <UserAddEditModal name={item.name} email={item.email} roleId={item.role_id} modalType={"edit"}/>
                                        </a>
                                        <button href="javascript:void()" className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            <DeleteModalWarning email={item.email}/>
                                        </button>
                                    </td>

                                    {/*-------------------------- EDIT MODAL --------------------*/}
                                    {/*-------------------------- DELETE MODAL --------------------*/}
                                    
                                </tr>
                            ))
                            : "No user found."

                            : "Loading data..."
                        }
                    </tbody>
                </table>
            </div>
        </div>


    </>
    )
}