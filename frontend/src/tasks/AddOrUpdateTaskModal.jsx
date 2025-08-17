import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { showErrorToast, showSuccessToast } from "../utils/toastNotifications";

export default function AddOrUpdateTaskModal({ onClose, task = null, setTasks }) {
  const axiosPrivate = useAxiosPrivate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TO_DO",
  });
  const [errors, setErrors] = useState({});
  const [animate, setAnimate] = useState(false);

  // Update form when editing existing task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "TO_DO",
      });
    }
    setAnimate(true);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.status.trim()) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      let response;
      if (task?.id) {
        // Update task
        response = await axiosPrivate.patch(`task/tasks/${task.id}/`, formData);
        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? response.data : t))
        );
        showSuccessToast("Task updated successfully!");
      } else {
        // Create new task
        response = await axiosPrivate.post("task/tasks/", formData);
        setTasks((prev = []) => [response.data, ...prev]);
        showSuccessToast("Task created successfully!");
      }
      handleClose();
    } catch (error) {
      console.error("Error saving task:", error);
      const messages =
        error.response?.data
          ? Object.entries(error.response.data)
              .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(", ") : msg}`)
              .join(" | ")
          : error.message || "Something went wrong.";
      showErrorToast(messages);
    }
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6 mx-4 transition-all duration-300 transform ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h3 className="font-semibold text-xl mb-4 text-gray-900">
          {task?.id ? "Edit Task" : "Add Task"}
        </h3>

        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 my-2 text-gray-900 focus:outline-none focus:ring-2 ${
            errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title}</p>}

        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 my-2 min-h-[120px] text-gray-900 focus:outline-none focus:ring-2 ${
            errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 my-2 text-gray-900 focus:outline-none focus:ring-2 ${
            errors.status ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
        >
          <option value="TO_DO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm mb-2">{errors.status}</p>}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {task?.id ? "Update Task" : "Save Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
