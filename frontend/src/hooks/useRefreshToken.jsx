import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL = import.meta.env.VITE_API_BASE_URL;

const useRefreshToken = () => {
  const navigate = useNavigate();

  const refreshTokenFunction = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const refreshToken = currentUser?.tokens?.refresh;

    if (!refreshToken) {
      console.error("No refresh token available");
      localStorage.removeItem("currentUser");
      navigate("/");
      return null;
    }

    try {
      const response = await axios.post(`${URL}authx/token/refresh/`, {
        refresh: refreshToken,
      });

      const accessToken = response.data.access;
      const newRefreshToken = response.data.refresh;

      // ✅ update localStorage with new tokens
      const updatedUser = {
        ...currentUser,
        tokens: {
          access: accessToken,
          refresh: newRefreshToken,
        },
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      return accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      localStorage.removeItem("currentUser");
      navigate("/");
      return null;
    }
  };

  return refreshTokenFunction;
};

export default useRefreshToken;
