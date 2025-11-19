"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="bg-background flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-8">
          Sorry, an unexpected error has occurred. We’re working on fixing it.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button onClick={() => reset()} className="cursor-pointer gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Return home
            </Link>
          </Button>
        </div>
        {error.digest && (
          <p className="text-muted-foreground mt-8 text-xs">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
