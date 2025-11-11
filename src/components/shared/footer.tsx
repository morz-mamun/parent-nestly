"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ArrowUpFromLine,
  Facebook,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { socialMediaData } from "@/constants/social-media-data";
import { NewsletterForm } from "../home/newsletter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative max-w-screen mx-auto bg-secondary/5">
      <div className="mx-auto max-w-screen-2xl">
        {/* footer content */}
        <div className="grid grid-cols-2 py-8 md:grid-cols-3 md:py-12 lg:grid-cols-4 border-b border-b-muted-foreground/10">
          {/* about us and contact us */}
          <div className="">
            <h3 className="font-inter mb-2 text-lg font-bold">
              <span className="dark:text-primary ">ParentNestly</span>
            </h3>
            <p className="mb-4">
              Your trusted companion in the parenting journey, offering expert
              insights and heartfelt advice.
            </p>
          </div>
          {/* quick links */}
          <div className="flex flex-col space-y-3 lg:mx-auto">
            <h4 className="font-inter text-lg font-semibold">Quick Links</h4>

            <div className="flex flex-col items-start space-y-2 text-sm">
              <Link
                href="/about-us"
                className=" dark:text-primary relative inline-block text-xs transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full md:text-base"
              >
                About Us
              </Link>

              <Link
                href="#/contact-us"
                className=" dark:text-primary relative inline-block text-xs transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full md:text-base"
              >
                Contact
              </Link>
              <Link
                href="#/privacy-policy"
                className=" dark:text-primary relative inline-block text-xs transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full md:text-base"
              >
                Privacy Policy
              </Link>
              <Link
                href="#/terms-and-conditions"
                className=" dark:text-primary relative inline-block text-xs transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full md:text-base"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* category  */}
          <div className="flex flex-col space-y-3 lg:mx-auto">
            <h4 className="font-inter text-md font-semibold">Categories</h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#/privacy-policy"
                  className=" dark:text-primary relative inline-block text-xs transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full md:text-base"
                >
                  Product Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="#/terms-and-conditions"
                  className=" dark:text-primary relative inline-block text-xs transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full md:text-base"
                >
                  Buying Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#/terms-and-conditions"
                  className=" dark:text-primary relative inline-block text-xs transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full md:text-base"
                >
                  Parenting Tips
                </Link>
              </li>
              <li>
                <Link
                  href="#/terms-and-conditions"
                  className=" dark:text-primary relative inline-block text-xs transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full md:text-base"
                >
                  Baby Care
                </Link>
              </li>
            </ul>
          </div>

          {/* newsletter */}
          <NewsletterForm />
        </div>
        {/* back to top button for large screens */}
        <div className="absolute right-2 bottom-72 hidden lg:block">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-b from-primary to-secondary px-4 py-4 text-white shadow-lg transition-colors hover:scale-105 hover:bg-gradient-to-b hover:from-secondary hover:to-primary duration-300 dark:shadow-lg"
          >
            <ArrowUpFromLine size={24} className="animate-bounce text-white" />
            {/* Back to Top */}
          </button>
        </div>
        {/* back to top button for medium and small screens */}
        <div className="flex items-center justify-center lg:hidden">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-b from-[#0908C3] to-[#0C34E9] px-4 py-4 text-white shadow-lg transition-colors hover:scale-105 hover:bg-gradient-to-b hover:from-[#000EAC] hover:to-[#00163C] dark:shadow-lg"
          >
            <ArrowUpFromLine size={24} className="animate-bounce text-white" />
            {/* Back to Top */}
          </button>
        </div>
      </div>
      {/* copyright */}
      <div className="max-w-screen-2xl mx-auto flex justify-between py-5 text-center text-zinc-500">
        <p className="">© {currentYear} ParentNestly. All rights reserved.</p>
        <div>
          <ul className="flex justify-center space-x-4">
            {Object.entries(socialMediaData).map(([platform, url]) => (
              <li key={platform}>
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  <Icon icon={`mdi:${platform}`} className="h-5 w-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
