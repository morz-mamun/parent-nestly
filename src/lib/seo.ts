import { TBlog } from "@/types/blog";

export function generateBlogSEO(blog: TBlog, url: string) {
  return {
    title: blog?.metaTitle,
    description: blog?.metaDescription,
    keywords: blog?.primaryKeyword,
    authors: [{ name: blog?.author || "Unknown Author" }],

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title: blog?.metaTitle,
      description: blog?.metaDescription,
      url,
      siteName: "ParentNestly", // Add your site name
      type: "article",
      publishedTime: blog?.publishDate,
      modifiedTime: blog?.publishDate,
      authors: [blog?.author || "Unknown Author"],
      images: [
        {
          url: blog?.image,
          width: 1200,
          height: 630,
          alt: blog?.title,
        },
      ],
      locale: "en_US", // Adjust based on your content
    },

    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [blog.image],
      creator: "@YourTwitterHandle", // Optional: author's Twitter
      site: "@YourSiteTwitter", // Your site's Twitter handle
    },
  };
}
