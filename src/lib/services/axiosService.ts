// import { authOptions } from "@/app/api/auth/authOption";
// import { Options } from "@/app/api/auth/Option";
import { Options } from "@/app/api/auth/Option";
import axios from "axios";
import { getServerSession } from "next-auth";

const axiosService = axios.create({
  baseURL: "https://goodplace-api.vercel.app/api",

  headers: {
    "Content-Type": "application/json",
  },
});
axiosService.defaults.headers.post["Content-Type"] = "application/json";

axiosService.interceptors.request.use(async (AxiosRequestConfig) => {
  const session: any = await getServerSession(Options);
  let token;
  if (session) {
    token = session.jwt;
  }
  AxiosRequestConfig.headers.Authorization = `Bearer ${token}`;
  return AxiosRequestConfig;
});
axiosService.interceptors.response.use(
  (AxiosResponse) => {
    return AxiosResponse;
  },
  (error) => {
    try {
    } catch (e) {}
    throw error;
  }
);
export default axiosService;
