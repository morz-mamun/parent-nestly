import { useQuery } from "@tanstack/react-query";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const result = await res.json();
      return result?.data;
    },
  });
};

// If i want to filter by status

// export const useBlogs = (status?: string) => {
//   return useQuery({
//     queryKey: ["blogs", status],
//     queryFn: async () => {
//       const url = status ? `/api/blogs?status=${status}` : `/api/blogs`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Failed to fetch blogs");
//       const result = await res.json();
//       return result?.data;
//     },
//   });
// };

// use it in ur component
// const { data: publishedBlogs } = useBlogs("published");
// const { data: draftBlogs } = useBlogs("draft");
