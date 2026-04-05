"use client";

import { useEffect, useState } from "react";
import api from "@/src/api/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const params: any = { page, search };

      if (status !== "all") {
        params.status = status;
      }

      const res = await api.get("/tasks", { params });

      setTasks(res.data.tasks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchTasks();
  }, [page, search, status]);

  const handleCreate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post("/tasks", {
        title,
        description,
      });
      toast.success("Task created");

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure to delete this task?")) {
      return;
    }

    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");

      fetchTasks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingId) return;

    try {
      await api.put(`/tasks/${editingId}`, {
        title,
        description,
      });

      toast.success("Task updated");
      setEditingId(null);
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      await api.post("/auth/logout", {
        refreshToken,
      });
      toast.success("Logged out");
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>

        {/* search */}

        <input
          placeholder="Search task"
          className="border p-3 w-full mt-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* filter */}

        <select
          className="border p-3 mt-2 rounded-lg shadow-sm w-full sm:w-40 bg-white"
          value={status}
          onChange={(e) => {
            setPage(1);

            setStatus(e.target.value);
          }}
        >
          <option value="all">All</option>

          <option value="true">Completed</option>

          <option value="false">Pending</option>
        </select>

        {/* create */}

        <form
          onSubmit={editingId ? handleUpdate : handleCreate}
          className="mt-6 space-y-3 bg-white p-5 rounded-xl shadow"
        >
          <input
            placeholder="Task title"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Description"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
           className={`px-5 py-2 text-white rounded-lg shadow w-full sm:w-auto transition ${
              editingId ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            {editingId ? "Update Task" : "Create Task"}
          </button>
        </form>
        {loading && <p className="text-center mt-4 text-gray-500 animate-pulse">
Loading tasks...
</p>}

        {/* list */}

        <div className="mt-6 space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-lg transition"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>

                <p className="text-gray-600">{task.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleToggle(task.id)}
                  className={`px-3 py-1 rounded-lg text-white shadow ${
                    task.status ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {task.status ? "Completed" : "Pending"}
                </button>
                <button
                  onClick={() => {
                    setEditingId(task.id);

                    setTitle(task.title);

                    setDescription(task.description);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-white shadow"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && <p>No tasks found</p>}
        </div>

        {/* pagination */}

        <div className="mt-8 flex justify-center gap-3 items-center">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="border px-4 py-2 rounded-lg bg-white shadow"
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            onClick={() => setPage(page + 1)}
            className="border px-4 py-2 rounded-lg bg-white shadow"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
