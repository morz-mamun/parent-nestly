import { ArrowRight, Store } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="my-36 max-w-screen-xl mx-auto">
      <div className="space-y-12">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Store className="w-4 h-4" />
            Get to Know Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="text-foreground">Where Parenthood Meets</span>{" "}
            <span className="text-primary">Practical Living</span>
          </h2>
          <p className="text-xl text-muted-foreground mx-auto text-pretty">
            Helping parents make confident choices every step of the way.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="aspect-square bg-accent/20 rounded-3xl overflow-hidden h-[450px] w-full">
              <img
                src="/modern-creative-studio-workspace-with-plants-and-n.jpg"
                alt="Our creative workspace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
          </div>
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-medium tracking-tight">
                Story of ParentNestly
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ParentNestly is here to support parents with simple advice,
                thoughtful product suggestions, and real-life tips that make
                family life easier.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We&apos;re a team of parents and experts who understand the
                everyday struggles and joys of raising children. From baby care
                to big kid milestones, our goal is to help you make smart
                choices with confidence.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                All our guides and product picks are carefully researched and
                reviewed to give you trustworthy answers when you need them
                most. Parenting is full of decisions, and we’re here to make
                them a little easier every step of the way.
              </p>
            </div>

            <div className="flex gap-4">
              <Link href="/about-us">
                <Button
                  size="lg"
                  className="group cursor-pointer bg-primary rounded-full"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button
                  variant="outline"
                  size="lg"
                  className="group cursor-pointer rounded-full bg-foreground/5"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
