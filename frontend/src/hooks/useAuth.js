import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("authx/login/", { email, password });
      const user = response.data;

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (user.token) localStorage.setItem("token", user.token);
        navigate("/task");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/");
  };

  return { login, logout, loading };
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};
