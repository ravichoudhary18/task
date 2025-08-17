import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import useAxiosPrivate from "../hooks/useAxiosPrivate"; 
import { showErrorToast } from "../utils/toastNotifications";

export default function TaskFilters({ setTasks }) {
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = async () => {
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.startDate) params.start_date = filters.startDate;
      if (filters.endDate) params.end_date = filters.endDate;
      if (filters.status) params.status = filters.status;

      const response = await axiosPrivate.get("task/tasks/", { params });
      setTasks(response.data.results || []);
    } catch (error) {
      console.error("Error filtering tasks:", error);
      if (error.response?.data) {
        const messages = Object.entries(error.response.data).map(
          ([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
        );
        showErrorToast(messages.join(" | "));
      } else if (error.request) {
        showErrorToast("No response from server. Please try again.");
      } else {
        showErrorToast(error.message);
      }
    }
  };

  const handleClear = async () => {
    setFilters({ search: "", startDate: "", endDate: "", status: "" });
    try {
      const response = await axiosPrivate.get("task/tasks/");
      setTasks(response.data.results || []);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to fetch tasks");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-6">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={filters.search}
        onChange={handleChange}
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Status</option>
        <option value="TO_DO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 w-full sm:w-auto"
      >
        <FaFilter /> Filter
      </button>

      <button
        onClick={handleClear}
        className="px-4 py-2 bg-gray-400 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-500 w-full sm:w-auto"
      >
        <FaTimes /> Clear
      </button>
    </div>
  );
}
