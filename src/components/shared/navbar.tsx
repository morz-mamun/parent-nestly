"use client";

import { Button } from "@/components/ui/button";
import { navItems } from "@/constants/navItem";

import { Triangle } from "lucide-react";
import Link from "next/link";

export function WebSiteNavbar() {
  return (
    <nav className="sticky top-0 z-50  border-b border-border/50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Triangle className="h-6 w-6 fill-foreground" />
            <span className="text-xl font-semibold">ParentNestly</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            {"Sign Up"}
          </Button>
          <Button>{"Login"}</Button>
        </div>
      </div>
    </nav>
  );
}
