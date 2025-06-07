"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { RegisterData } from "@/types/register";

const RegisterPage = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.password_confirmation) {
      setError("Password and confirmation do not match.");
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      setSuccess("Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-96 p-6 z-10 bg-gray-800 shadow-md rounded-lg"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-white">
          Register Admin
        </h1>

        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded text-sm text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 bg-green-100 p-2 rounded text-sm text-center">
            {success}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="p-2 border border-gray-300 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          className="p-2 border border-gray-300 rounded"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Register
        </button>

        <p className="text-center flex items-center gap-2 justify-center text-gray-400">
          Already have an account?
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </form>
  );
};

export default RegisterPage;
