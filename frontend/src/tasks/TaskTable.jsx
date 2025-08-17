import React, { useState, useMemo } from "react";

function TaskTable({ tasks = [], onStatusChange, onEdit, onDelete }) {
  const [filters, setFilters] = useState({
    title: "",
    description: "",
    status: "",
    created_at: "",
  });

  // Handle filter input change
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Apply filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchTitle = task.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      const matchDesc = task.description
        .toLowerCase()
        .includes(filters.description.toLowerCase());
      const matchStatus = filters.status
        ? task.status === filters.status
        : true;
      const matchDate = filters.created_at
        ? new Date(task.created_at).toLocaleDateString() ===
          new Date(filters.created_at).toLocaleDateString()
        : true;

      return matchTitle && matchDesc && matchStatus && matchDate;
    });
  }, [tasks, filters]);

  return (
    <div className="w-full">
      {/* Desktop / Laptop Table */}
      <div className="hidden md:block border border-gray-200 rounded-lg overflow-x-auto bg-white shadow-sm">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">
                Title
                <input
                  type="text"
                  value={filters.title}
                  onChange={(e) => handleFilterChange("title", e.target.value)}
                  placeholder="Title Search"
                  className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs"
                />
              </th>
              <th className="px-4 py-3">
                Description
                <input
                  type="text"
                  value={filters.description}
                  onChange={(e) =>
                    handleFilterChange("description", e.target.value)
                  }
                  placeholder="Description Search"
                  className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs"
                />
              </th>
              <th className="px-4 py-3">
                Status
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs bg-white"
                >
                  <option value="">All</option>
                  <option value="TO_DO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </th>
              <th className="px-4 py-3">
                Created On
                <input
                  type="date"
                  value={filters.created_at}
                  onChange={(e) =>
                    handleFilterChange("created_at", e.target.value)
                  }
                  min="2023-01-01"
                  max={new Date().toISOString().split("T")[0]} // today's date
                  className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs"
                />
              </th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length ? (
              filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{task.title}</td>
                  <td className="px-4 py-3">{task.description}</td>
                  <td className="px-4 py-3">
                    <select
                      className="px-2 py-1 border border-gray-300 rounded bg-white"
                      value={task.status}
                      onChange={(e) =>
                        onStatusChange?.(task.id, e.target.value)
                      }
                    >
                      <option value="TO_DO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(task.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => onEdit?.(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => onDelete?.(task)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-3 text-center text-gray-400">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Optional: can add filters above cards instead of per column) */}
      <div className="md:hidden space-y-4">
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <p className="font-semibold text-gray-800">{task.title}</p>
              <p className="text-gray-600 mt-1">{task.description}</p>
              <div className="mt-3 flex flex-col gap-2">
                <select
                  className="px-2 py-1 border border-gray-300 rounded bg-white w-full text-gray-700"
                  value={task.status}
                  onChange={(e) => onStatusChange?.(task.id, e.target.value)}
                >
                  <option value="TO_DO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
                <span className="text-gray-500 text-sm">
                  {new Date(task.created_at).toLocaleString()}
                </span>
                <div className="flex gap-3">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => onEdit?.(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => onDelete?.(task)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default React.memo(TaskTable);
