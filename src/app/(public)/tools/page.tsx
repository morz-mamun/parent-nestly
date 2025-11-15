import Banner from "@/components/shared/banner";
import { earlyLearningBannerData } from "@/constants/banner/blog-banner-data";
import { toolsBannerData } from "@/constants/banner/tools-banner-data";
import React from "react";

export default function Tools() {
  return (
    // Coming Soon Page

    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <Banner data={toolsBannerData} />

      {/* main content with perfect color gradient */}
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-4xl font-bold">Tools</h1>
        <p className="text-lg mt-4">
          Stay up-to-date with the latest parenting tools and resources.
        </p>
      </div>
    </div>
  );
}
