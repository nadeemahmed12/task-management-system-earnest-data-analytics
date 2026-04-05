"use client";

import { useState } from "react";
import api from "@/src/api/axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("accessToken", res.data.accessToken);

      localStorage.setItem("refreshToken", res.data.refreshToken);

      router.push("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome back
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            placeholder="Email"
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-3 rounded-lg font-medium">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don't have account?
          <a href="/register" className="text-blue-600 ml-1 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
