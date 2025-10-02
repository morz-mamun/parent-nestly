"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const viewsData = [
  { date: "Jan 1", views: 2400 },
  { date: "Jan 8", views: 1398 },
  { date: "Jan 15", views: 3800 },
  { date: "Jan 22", views: 3908 },
  { date: "Jan 29", views: 4800 },
  { date: "Feb 5", views: 3800 },
  { date: "Feb 12", views: 4300 },
];

// const postsData = [
//   { category: "Technology", count: 45 },
//   { category: "Design", count: 32 },
//   { category: "Business", count: 28 },
//   { category: "Lifestyle", count: 22 },
// ]

// const engagementData = [
//   { month: "Sep", comments: 120, shares: 80 },
//   { month: "Oct", comments: 150, shares: 95 },
//   { month: "Nov", comments: 180, shares: 110 },
//   { month: "Dec", comments: 220, shares: 140 },
//   { month: "Jan", comments: 280, shares: 180 },
//   { month: "Feb", comments: 320, shares: 210 },
// ]

export function AnalyticsCharts() {
  return (
    <div className="">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Page Views</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last 7 days performance
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#colorViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Posts by Category</CardTitle>
          <p className="text-sm text-muted-foreground">Content distribution</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={postsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      {/* <Card className="border-border bg-card lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Engagement Metrics</CardTitle>
          <p className="text-sm text-muted-foreground">Comments and shares over time</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Line
                type="monotone"
                dataKey="comments"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))" }}
              />
              <Line
                type="monotone"
                dataKey="shares"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-3))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  );
}
