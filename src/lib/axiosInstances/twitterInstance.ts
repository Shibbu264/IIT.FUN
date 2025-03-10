import axios from "axios";
import store from "../store/store";
import { toast } from "sonner";

// Extend AxiosRequestConfig to include customMessage


 // Import Redux store

const twitterInstance = axios.create({
  baseURL: "https://api.twitter.com/2",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor to dynamically attach the token
twitterInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().user?.user?.socialAccounts?.find(account=>account?.provider=="twitter")?.accessToken; 
    // adjust this redux logic to wherever your token is (localStorage,DB anything)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
twitterInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage = error.config?.customMessage || false;
   // we will use this parameter to control the error type

    if (error.response && error.response.status === 401) {
      toast.error("Unauthorized request");
      // can simply call your retry aur reauthentication logic
    }
    else{
        if(customMessage){
        toast.error(error?.message)
        }
        else{
            toast.error("An Unexpected Error ocurred !")
        }
         // send your bydefault error message
    }
    return Promise.reject(error);
  }
);

export default twitterInstance;
