"use client";
import axiosService from "@/lib/services/axiosService";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  useEffect(() => {
    const requestInterceptor = axiosService.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user.token}`;
        }
        return config;
      }
    );
    return () => {
      axiosService.interceptors.request.eject(requestInterceptor);
    };
  }, [session]);
  return axiosService;
};
export default useAxiosAuth;
