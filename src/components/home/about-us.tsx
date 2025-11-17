import { ArrowRight, Store } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="my-20 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Store className="w-4 h-4" />
          Get to Know Us
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          <span className="text-foreground">Where Parenthood Meets</span>{" "}
          <span className="text-primary">Practical Living</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Helping parents make confident choices every step of the way.
        </p>
      </div>

      {/* Content */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative w-full">
          <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden bg-accent/20">
            <img
              src="/modern-creative-studio-workspace-with-plants-and-n.jpg"
              alt="Our creative workspace"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
        </div>

        {/* Text */}
        <div className="space-y-8">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Story of ParentNestly
          </h3>
          <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            <p>
              ParentNestly is here to support parents with simple advice,
              thoughtful product suggestions, and real-life tips that make
              family life easier.
            </p>
            <p>
              We&apos;re a team of parents and experts who understand the
              everyday struggles and joys of raising children. From baby care to
              big kid milestones, our goal is to help you make smart choices
              with confidence.
            </p>
            <p>
              All our guides and product picks are carefully researched and
              reviewed to give you trustworthy answers when you need them most.
              Parenting is full of decisions, and we’re here to make them a
              little easier every step of the way.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/about-us">
              <Button
                size="lg"
                className="group cursor-pointer bg-primary rounded-full w-full sm:w-auto justify-center"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button
                variant="outline"
                size="lg"
                className="group cursor-pointer rounded-full bg-foreground/5 w-full sm:w-auto justify-center"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
