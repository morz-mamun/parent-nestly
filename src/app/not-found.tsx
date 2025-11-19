import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex h-screen max-w-[320px] items-center justify-center overflow-hidden text-center md:max-w-xl lg:max-w-4xl">
      <p className="bg-[linear-gradient(182deg,#100F0F_48.65%,#5C5B5B_83.27%)] bg-clip-text text-[100px] font-extrabold text-transparent md:text-[200px] lg:text-[400px] dark:bg-[linear-gradient(182deg,#f5f5f5_48.65%,#a1a1a1_83.27%)]">
        4
      </p>

      {/* middle content */}
      <div className="rounded-[20px] border-2 bg-[linear-gradient(182deg,#100F0F_48.65%,#5C5B5B_83.27%)] bg-clip-text px-2 pt-5 font-bold text-transparent shadow-[0_4px_3px_0_rgba(0,0,0,0.25),0_2px_1.7px_0_rgba(180,180,180,0.25)] md:rounded-[40px] md:border-[6px] md:px-5 lg:border-[6px] lg:px-[32px] lg:pt-10 dark:bg-[linear-gradient(182deg,#f5f5f5_48.65%,#a1a1a1_83.27%)]">
        <p className="font-inter text-xs md:text-2xl lg:text-[32px]">
          <span className="text-xl md:text-[32px] lg:text-[50px]">ERROR</span>{" "}
          <br />
          Sorry, <br />
          Page Not Found
        </p>
        <p className="text-brand/80 dark:text-brand/60 mt-2 text-start text-[8px] font-normal md:mt-5 md:text-sm lg:mt-10">
          Go to other sections, or try to find what you are looking for.
        </p>

        <Link
          href="/"
          className="mx-auto mt-2 mb-5 flex items-center overflow-hidden rounded-lg border border-gray-100 bg-white p-1 shadow-md md:mt-5 md:max-w-xs lg:mb-10 dark:border-gray-700 dark:bg-gray-900"
        >
          <p className="flex-1 px-2 text-left text-xs text-black shadow-none md:text-sm dark:text-white">
            Back to home
          </p>
          <Button className="hover:bg-[] cursor-pointer rounded-[8px] border-0 bg-black text-xs font-medium text-white shadow-[inset_2px_2px_4px_0_rgba(255,254,254,0.25)] md:px-4 md:py-5 md:text-sm dark:bg-white dark:text-black">
            <Icon icon="icons8:right-round" className="text-2xl" />
          </Button>
        </Link>
      </div>

      <p className="bg-[linear-gradient(182deg,#100F0F_48.65%,#5C5B5B_83.27%)] bg-clip-text text-[100px] font-extrabold text-transparent md:text-[200px] lg:text-[400px] dark:bg-[linear-gradient(182deg,#f5f5f5_48.65%,#a1a1a1_83.27%)]">
        4
      </p>
    </div>
  );
}
