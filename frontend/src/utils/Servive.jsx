import axios from 'axios'
import { Navigate } from 'react-router-dom'
const userBaseURL = import.meta.env.VITE_API_BASEURL

export const userAxios = axios.create({
    baseURL: userBaseURL,
    headers:{
        "Content-Type": "multipart/form-data"
    },
    withCredentials: true
})

userAxios.interceptors.request.use(config =>{
    const token = localStorage.getItem("userToken")
    if (token){
        config.headers.Authorization = token
    }
    return config
})

userAxios.interceptors.response.use(
    response => {
      return response;
    },
    
    error => {
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 401:
           
            localStorage.removeItem('userToken');
            window.location.href = '/login'; 
            break;
          case 403:
            
            alert('You do not have the necessary permissions to access this resource.');
            break;
          case 404:
            
            alert('The requested resource was not found.');
            break;
          case 500:
            
            alert('An internal server error occurred.');
            break;
          default:
            alert('An error occurred.');
        }
      }
      return Promise.reject(error);
    }
  );
