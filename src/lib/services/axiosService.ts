// import { authOptions } from "@/app/api/auth/authOption";
// import { Options } from "@/app/api/auth/Option";
<<<<<<< HEAD
import { authOptions } from "../../../utils/authOptions";
=======
// import { Options } from "@/app/api/auth/Option";
>>>>>>> 84d54d6ae6ffcc53cff4479c6774673bfcbb1c7a
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/authOptions";

const axiosService = axios.create({
  baseURL: "https://goodplace-api.vercel.app/api",

  headers: {
    "Content-Type": "application/json",
  },
});
axiosService.defaults.headers.post["Content-Type"] = "application/json";

axiosService.interceptors.request.use(async (AxiosRequestConfig) => {
  const session: any = await getServerSession(authOptions);
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
