import { useEffect, useState, useCallback } from "react";
import AddTaskButton from "./AddTaskButton";
import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";
import AddOrUpdateTaskModal from "./AddOrUpdateTaskModal";
import ConfirmModal from "../components/ConfirmModal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { showErrorToast, showSuccessToast } from "../utils/toastNotifications";
import { Pagination } from "../components/pagination/Pagination";

export default function Tasks() {
  const axiosPrivate = useAxiosPrivate();

  const [tasks, setTasks] = useState([]);
  const [modalTask, setModalTask] = useState(null);
  const [confirmTask, setConfirmTask] = useState(null);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    count: null,
  });

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axiosPrivate.get("task/tasks/");
      setTasks(response.data.results || []);
      setPagination((prev) => ({
        ...prev,
        next: response.data?.next,
        previous: response.data?.previous,
        count: response.data?.count,
      }));
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to fetch tasks");
    }
  }, [axiosPrivate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handlers
  const handleStatusChange = useCallback(
    async (taskId, newStatus) => {
      try {
        await axiosPrivate.patch(`task/tasks/${taskId}/`, {
          status: newStatus,
        });
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
        );
        showSuccessToast("Status updated");
      } catch (error) {
        console.error(error);
        showErrorToast("Failed to update status");
      }
    },
    [axiosPrivate]
  );

  const handleDelete = useCallback(
    async (taskId) => {
      try {
        await axiosPrivate.delete(`task/tasks/${taskId}/`);
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        showSuccessToast("Task deleted");
      } catch (error) {
        console.error(error);
        showErrorToast("Failed to delete task");
      }
    },
    [axiosPrivate]
  );

  const openModal = useCallback((task = {}) => setModalTask(task), []);
  const closeModal = useCallback(() => setModalTask(null), []);
  const openConfirm = useCallback((task) => setConfirmTask(task), []);
  const closeConfirm = useCallback(() => setConfirmTask(null), []);

  return (
    <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-md mt-4">
      <h1 className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
        Tasks
      </h1>

      <AddTaskButton onClick={() => openModal()} />

      <TaskFilters setTasks={setTasks} />
      <div className="my-4">
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          setRecord={setTasks}
        />
      </div>

      <TaskTable
        tasks={tasks}
        onEdit={openModal}
        onStatusChange={handleStatusChange}
        onDelete={openConfirm}
      />

      {modalTask && (
        <AddOrUpdateTaskModal
          onClose={closeModal}
          task={modalTask.id ? modalTask : null}
          setTasks={setTasks}
        />
      )}

      {confirmTask && (
        <ConfirmModal
          title="Confirm Delete"
          message={`Are you sure you want to delete "${confirmTask.title}"? This cannot be undone.`}
          confirmText="Delete"
          confirmColor="bg-red-600"
          onClose={closeConfirm}
          onConfirm={() => {
            handleDelete(confirmTask.id);
            closeConfirm();
          }}
        />
      )}
    </div>
  );
}
