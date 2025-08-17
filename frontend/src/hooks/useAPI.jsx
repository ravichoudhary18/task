import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import MainContext from "../context/MainContext";
import useAxiosPrivate from "./useAxiosPrivate";

const useAPI = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setIsLoading } = useContext(MainContext);
  const navigate = useNavigate();

  /**
   * Makes an API request using the provided URL, method, data, and configuration.
   * Utilizes axiosPrivate to send the request and handles loading state.
   *
   * @param {string} url - The URL to send the request to.
   * @param {string} [method="GET"] - The HTTP method to use for the request.
   * @param {Object|null} [data=null] - The data to be sent in the request body.
   * @param {Object} [config={}] - Additional Axios configuration options.
   *
   * @returns {Promise<Object|boolean>} - The response data if successful, or false if an error occurs.
   *
   * @throws Will throw an error if the response status is not within the 2xx range.
   */

  const makeAPIRequest = async (
    url,
    method = "GET",
    data = null,
    config = {},
    loader_state = true,
  ) => {
    setIsLoading(loader_state);
    try {
      const response = await axiosPrivate({
        url,
        method,
        data,
        ...config,
      });

      setIsLoading(false);

      return { success: true, data: response.data, status: response.status };
    } catch (error) {
      setIsLoading(false);

      // Handle unauthorized access (401) and redirect to login
      if (error?.response?.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login", { replace: true });
      }

      return {
        success: false,
        error, // 🔥 full error block here
        status: error?.response?.status,
      };
    }
  };

  return {
    getAPI: (url, config, loader_state) =>
      makeAPIRequest(url, "GET", null, config, loader_state),
    postAPI: (url, data, config, loader_state) =>
      makeAPIRequest(url, "POST", data, config, loader_state),
    putAPI: (url, data, config, loader_state) =>
      makeAPIRequest(url, "PUT", data, config, loader_state),
    deleteAPI: (url, config, loader_state) =>
      makeAPIRequest(url, "DELETE", null, config, loader_state),
    patchAPI: (url, data, config, loader_state) =>
      makeAPIRequest(url, "PATCH", data, config, loader_state), // Added PATCH method
  };
};

export default useAPI;
