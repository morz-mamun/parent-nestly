"use client";
import { StatsCards } from "@/components/dashboard/stats-cards";
import DashboardSkeleton from "@/components/Skeletons/dashboard-skeleton";
import { Bell, Search } from "lucide-react";
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
  } else {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p>
                  Welcome back! Here&apos;s what&apos;s happening with your blog
                  today.
                </p>
              </div>
            </div>

            <div className="relative w-fit md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <StatsCards />

          {/* <AnalyticsCharts /> */}

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">{/* <RecentPosts /> */}</div>
            <div>{/* <QuickActions /> */}</div>
          </div>
        </main>
      </div>
    );
  }
}
