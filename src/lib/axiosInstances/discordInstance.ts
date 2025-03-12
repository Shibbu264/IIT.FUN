import axios from "axios";
import store from "../store/store";
import { toast } from "sonner";

// Extend AxiosRequestConfig to include customMessage


 // Import Redux store

const discordInstance = axios.create({
  baseURL: "https://discord.com/api/v10",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor to dynamically attach the token
discordInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().user?.user?.socialAccounts?.find(account=>account?.provider=="discord")?.accessToken; 
    // adjust this redux logic to wherever your token is (localStorage,DB anything)
    if (token) {
      // Discord expects "Bearer " prefix - ensure it's properly formatted
      config.headers.Authorization = token.startsWith("Bearer ") 
        ? token 
        : `Bearer ${token}`;
      // For debugging - remove in production
      console.log("Making Discord request with token:", config.headers.Authorization.substring(0, 15) + "...");
    } else {
      console.log("No Discord token found in store");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
discordInstance.interceptors.response.use(
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

export default discordInstance;
