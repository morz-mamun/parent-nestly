import { SubscribersTable } from "@/components/admin/subscribers-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function SubscribersPage() {
  return (
    <div className="bg-background">
      {/* Header */}
      <header className="sticky top-16 z-10 w-full border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/admin/dashboard">
            <Button
              size="sm"
              variant="outline"
              className="shadow-sm bg-transparent"
            >
              <Eye className="h-4 w-4 mr-2" /> Back Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SubscribersTable />
      </main>
    </div>
  );
}
