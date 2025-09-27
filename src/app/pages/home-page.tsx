import ExploreOurCategory from "@/components/home/explore-our-category";
import { HomeBanner } from "@/components/home/home-banner";
import LatestArticles from "@/components/home/latest-articles";
import React from "react";

export default function HomePage() {
  return (
    <main>
      <HomeBanner />
      <ExploreOurCategory />
      <LatestArticles />
    </main>
  );
}
