"use client";

import { TBanner } from "@/constants/banner/blog-banner-data";

export default function Banner({ data }: { data: TBanner }) {
  const { title, description } = data;
  return (
    <section className="max-w-screen bg-gradient-to-b from-primary/40 to-primary/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
      </div>
    </section>
  );
}

// "use client";

// import { TBanner } from "@/constants/banner/blog-banner-data";

// export default function Banner({ data }: { data: TBanner }) {
//   const { title, description } = data;
//   return (
//     <section className="relative py-16 bg-white overflow-hidden">
//       {/* Gradient overlay that fades into bg */}
//       <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-white" />

//       {/* Content */}
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
//           {title}
//         </h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
//       </div>
//     </section>
//   );
// }
