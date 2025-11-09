import { useQuery } from "@tanstack/react-query";

export const useBlogs = (category?: string) => {
  return useQuery({
    queryKey: ["blogs", category],
    queryFn: async () => {
      const url = category
        ? `/api/admin/blogs?category=${encodeURIComponent(category)}`
        : `/api/admin/blogs`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const result = await res.json();
      return result?.data;
    },
  });
};

// If i want to filter by status

export const useFilteredBlogsByCategory = (category?: string) => {
  return useQuery({
    queryKey: ["blogs", category],
    queryFn: async () => {
      const url = category
        ? `/api/admin/blogs?category=${category}`
        : `/api/admin/blogs`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const result = await res.json();
      return result?.data;
    },
  });
};

// use it in ur component
// const { data: publishedBlogs } = useBlogs("published");
// const { data: draftBlogs } = useBlogs("draft");
