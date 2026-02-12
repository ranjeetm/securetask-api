"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";

interface Task {
  id: string;
  title: string;
  description?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setTasks(data.data);
    }
  };

  const createTask = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await res.json();
    if (res.ok) {
      setTitle("");
      setDescription("");
      fetchTasks();
    } else {
      setMessage(data.message);
    }
  };

  const deleteTask = async (id: string) => {
    await fetch(`${API_BASE_URL}/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>

      {/* Create Task */}
      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={createTask}
          className="bg-black text-white px-4 py-2"
        >
          Create Task
        </button>

        {message && <p className="text-red-500">{message}</p>}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border p-4 flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-3 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
