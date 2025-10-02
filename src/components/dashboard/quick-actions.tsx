import { FileText, Plus, Settings, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "New Post",
    description: "Create a new blog post",
    icon: Plus,
    variant: "default" as const,
  },
  {
    title: "Upload Media",
    description: "Add images or videos",
    icon: Upload,
    variant: "outline" as const,
  },
  {
    title: "Manage Posts",
    description: "Edit existing content",
    icon: FileText,
    variant: "outline" as const,
  },
  {
    title: "Settings",
    description: "Configure your blog",
    icon: Settings,
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">Common tasks</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant={action.variant}
              className="w-full justify-start h-auto py-4 px-4"
            >
              <div className="flex items-center gap-3 w-full">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                    action.variant === "default"
                      ? "bg-primary-foreground/10"
                      : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${action.variant === "default" ? "text-primary-foreground" : "text-primary"}`}
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p
                    className={`text-xs ${
                      action.variant === "default"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
