"use client";

import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="font-bold">Management Product</h1>
      <ul className="flex items-center gap-6">
        <li className="cursor-pointer flex items-center gap-2">
          <CgProfile size={30} />
          <p>{user?.name || "Profile"}</p>
        </li>
        <li>
          <button
            onClick={logout}
            className="p-2 flex items-center gap-2 bg-red-500 rounded hover:bg-red-600"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
