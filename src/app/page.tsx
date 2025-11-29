"use client";

import HeartBackground from "@/components/RealisticBackground";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <HeartBackground />
    </div>
  );
}
