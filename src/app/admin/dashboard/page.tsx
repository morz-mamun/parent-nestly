"use client";
import DashboardSkeleton from "@/components/Skeletons/dashboard-skeleton";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
      router.push("/admin/dashboard");
    }
  }, [router]);

  if (!isAuthenticated) {
    return <DashboardSkeleton />;
  }
}
