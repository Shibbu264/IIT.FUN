import axios from "axios";
import store from "../store/store";
import { toast } from "sonner";

// Extend AxiosRequestConfig to include customMessage


// Import Redux store

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor to dynamically attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    // You can attach tokens or modify the request here
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      toast.success(response.data.message)
    }
    return response;
  },
  (error) => {
    const customMessage = error.config?.customMessage || false;
    // we will use this parameter to control the error type

    if (error.response && error.response.status === 401) {
      toast.error("Unauthorized request");
      // can simply call your retry aur reauthentication logic
    }
    else {
      if (customMessage) {
        toast.error(error?.message)
      }
      else {
        console.log(error)
        toast.error("An Unexpected Error ocurred !")
      }
      // send your bydefault error message
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
