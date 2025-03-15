import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const customMessage = response.config?.headers?.["X-Custom-Error"];
    if (response.data.message && customMessage != "none") {
      toast.success(response.data.message);
    }
    if (response.data.points) {
      if (response.data.reason) {
        toast.warning(response.data.reason, { duration: 2000 })
      }
      else {
        toast.warning(`${response.data.points} points awarded!`, { duration: 6000,position:"top-center" })
      }
    }
    return response;
  },
  (error) => {
    // ✅ Store custom message inside `headers`
    const customMessage = error.config?.headers?.["X-Custom-Error"];

    if (error.response?.status === 401) {
      toast.error("Unauthorized request");
    } else {
      if (customMessage == "none") {

      }
      else if (customMessage) {
        toast.error(customMessage);
      } else {
        console.error(error);
        toast.error("An unexpected error occurred!");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
