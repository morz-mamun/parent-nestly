"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TBanner } from "@/constants/banner/blog-banner-data";

export default function Banner({ data }: { data: TBanner }) {
  const { title, description } = data;
  const pathname = usePathname();

  // Split URL path (e.g., "/blogs/baby-care" → ["blogs", "baby-care"])
  const segments = pathname.split("/").filter((seg) => seg !== "");

  // Build breadcrumb list
  const breadcrumbs = segments.map((seg, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { label: decodeURIComponent(seg), href };
  });

  return (
    <section className="w-full bg-gradient-to-b from-primary/40 to-primary/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white capitalize">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
