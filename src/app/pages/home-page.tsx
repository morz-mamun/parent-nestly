import AboutUs from "@/components/home/about-us";
import ExploreOurCategory from "@/components/home/explore-our-category";
import HomeFAQ from "@/components/home/faq";
import { HomeBanner } from "@/components/home/home-banner";
import LatestArticles from "@/components/home/latest-articles";
import TopProducts from "@/components/home/top-products";
import React from "react";

export default function HomePage() {
  return (
    <main>
      <HomeBanner />
      <ExploreOurCategory />
      <LatestArticles />
      <TopProducts />
      <AboutUs />
      <HomeFAQ />
    </main>
  );
}
