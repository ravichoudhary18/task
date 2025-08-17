import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function LogoutButton({
  className = "",
  label = "Logout",
  icon = <FaSignOutAlt />,
}) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      // If your API requires refresh token in body
      const token = localStorage.getItem("token");
      await axiosPrivate.post("authx/logout/", { token });

      // Clear tokens & user
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");

      // Redirect to login
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);

      // Still clear local storage even if API fails
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 active:scale-[.98] dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 ${className}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
