// app/auth/layout.tsx
import Squares from "@/components/Squares";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex z-50 items-center p-6 justify-center bg-gray-800 h-screen text-white">
      <div className="absolute inset-0 z-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#fff"
          hoverFillColor="#222"
        />
      </div>
      {children}
    </div>
  );
}
