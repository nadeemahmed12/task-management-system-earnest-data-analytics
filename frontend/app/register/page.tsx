"use client";

import { useState } from "react";
import api from "@/src/api/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("Registration successful");

      router.push("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            placeholder="Email"
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-green-600 hover:bg-green-700 transition text-white w-full py-3 rounded-lg font-medium">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have account?
          <a href="/login" className="text-green-600 ml-1 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
