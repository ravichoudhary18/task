import { useEffect, useMemo } from "react";
import axios from "axios";
import useRefreshToken from "./useRefreshToken";

const URL = import.meta.env.VITE_API_BASE_URL;

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  const axiosPrivate = useMemo(() => {
    return axios.create({
      baseURL: URL,
    });
  }, []);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const accessToken = currentUser?.tokens?.access;

        if (accessToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        const message = error?.response?.data?.detail;

        if (
          error?.response?.status === 401 &&
          message === "Given token not valid for any token type"
        ) {
          const newAccessToken = await refresh();

          // Update localStorage
          const currentUser = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser?.tokens) {
            currentUser.tokens.access = newAccessToken;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
          }

          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, axiosPrivate]);

  return axiosPrivate;
};

export default useAxiosPrivate;
