import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { auth } from "../Firebase/firebase.init";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
  // timeout: 30000,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
      
        if (user && auth.currentUser) {
          try {
           
            const token = await auth.currentUser.getIdToken();
            
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (error) {
            console.error("Error getting token:", error);
          }
        }
        return config;
      }
    );

    // Response Interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          console.log("Token expired, logging out...");
          // await logOut();
          // navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;

