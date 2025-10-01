"use client";

import { Button } from "@/components/ui/button";
import { navItems } from "@/constants/navItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Triangle, Menu, Search } from "lucide-react";
import Link from "next/link";

export function WebSiteNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border/50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Triangle className="h-6 w-6 fill-foreground transition-transform group-hover:scale-110" />
            <span className="text-xl font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              ParentNestly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems?.map((item) => (
              <Link
                key={item?.name}
                href={item?.link}
                className="relative hover:text-primary transition-colors duration-200 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>

        {/* Fully modern search bar */}
        <div className="relative hidden lg:flex mx-10">
          <div className="w-fit">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
            <Search
              size={20}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        {/* <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Sign Up
          </Button>
          <Button className="shadow-sm hover:shadow-md transition-shadow duration-200">
            Login
          </Button>
        </div> */}

        {/* Mobile Menu (Popover) */}
        <div className="lg:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={20}
              className="max-w-[375px] flex flex-col gap-6"
            >
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Fully modern search bar */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
              {/* Mobile Auth Buttons */}
              {/* <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button variant="outline" className="w-full bg-transparent">
                  Sign Up
                </Button>
                <Button className="w-full">Login</Button>
              </div> */}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
