// utils/auth.ts
import api from "./api";
import Cookies from "js-cookie";
import type { RegisterData } from "@/types/register";
import type { LoginData } from "@/types/login";

export async function register(data: RegisterData) {
  const res = await api.post("/register", data);
  return res.data;
}

export async function login(data: LoginData) {
  const res = await api.post("/login", data);
  // Simpan token ke cookie, expire 1 hari
  Cookies.set("token", res.data.token, { expires: 1 });
  return res.data;
}

export async function getProfile() {
  const res = await api.get("/profile");
  return res.data.user;
}

export async function logout() {
  await api.post("/logout");
  Cookies.remove("token");
}
