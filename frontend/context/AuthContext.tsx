"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getProfile,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
} from "@/utils/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import type { UserData } from "@/types/user";
import type { RegisterData } from "@/types/register";

type AuthContextType = {
  user: UserData | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data: { email: string; password: string }) => {
    await loginRequest(data);
    await fetchProfile();
    router.push("/");
  };

  const register = async (data: RegisterData) => {
    await registerRequest(data);
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
