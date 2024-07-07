import axios from 'axios';

const token = localStorage.getItem('token');
export const getRequest = async (url, paramsData={}) => {
    try{
        if(!url){
            throw new Error('URL endpoint is missing.');
        }
        return await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}${url}`,{params: paramsData, headers: {'Authorization': `Bearer ${token}`}}).then((response)=> {
            return response.data;
        }).catch((error)=> {
            return {success: false, message: error.response?.data?.message || error.message};
        });
    }
    catch(error){
        return {success: false, message: error.message};
    }
}

export const postRequest = async (url, bodyData) => {
    try{
        return await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}${url}`,bodyData, {headers: { 'Authorization': `Bearer ${token}` }}).then((response)=> {
            return response.data;
        }).catch((error)=> {
            return {success: false, message: error.response?.data?.message || error.message};
        });
    }
    catch(error){
        return {success: false, message: error.message};
    }
}

export const putRequest = async (url, bodyData) => {
    try{
        return await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}${url}`, bodyData, {headers: { 'Authorization': `Bearer ${token}` }}).then((response)=> {
            return response.data;
        }).catch((error)=> {
            return {success: false, message: error.response?.data?.message || error.message};
        });
    }
    catch(error){
        return {success: false, message: error.message};
    }
}

export const deleteRequest = async (url, params) => {
    try{
        return await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}${url}/${params}`,  {headers: {'Authorization': `Bearer ${token}`}}).then((response)=> {
            return response.data;
        }).catch((error)=> {
            return {success: false, message: error.response?.data?.message || error.message};
        });
    }
    catch(error){
        return {success: false, message: error.message};
    }
}