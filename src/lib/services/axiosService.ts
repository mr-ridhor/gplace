// import { Options } from "@/app/api/auth/Option";
import axios from "axios";
import { getServerSession } from "next-auth";

const axiosService = axios.create({
  // baseURL: "https://goodplace-api.vercel.app/api",
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally add request and response interceptors
axiosService.interceptors.request.use(async (AxiosRequestConfig) => {
  // const session: any = await getServerSession(Options);
  let token;
  // if (session) {
  //   token = session?.user?.dbToken;
  // }
  AxiosRequestConfig.headers.Authorization = `Bearer ${token}`;
  return AxiosRequestConfig;
});

axiosService.interceptors.response.use(
  (response) => {
    // Any response-specific logic here
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosService;
