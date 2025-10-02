import {
  ArrowDown,
  ArrowUp,
  Eye,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Total Views",
    value: "45,231",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Total Posts",
    value: "127",
    change: "+3",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Comments",
    value: "1,429",
    change: "+8.2%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "Subscribers",
    value: "3,842",
    change: "-2.4%",
    trend: "down",
    icon: Users,
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "up";

        return (
          <Card
            key={stat.title}
            className="border-border bg-card hover:bg-card/80 transition-colors p-0"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isPositive ? "text-accent" : "text-destructive"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
