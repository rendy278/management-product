"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { LoginData } from "@/types/login";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-96 z-10 p-6 bg-gray-800 shadow-md rounded-lg"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-white">
          Login Admin
        </h1>

        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded text-sm text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>

        <p className="text-center flex items-center gap-2 justify-center text-gray-400">
          Don{"'"}t have an account?
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
