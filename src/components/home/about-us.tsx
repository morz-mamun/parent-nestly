import { ArrowRight, Store } from "lucide-react";
import { Button } from "../ui/button";

export default function AboutUs() {
  return (
    <section className="my-36 max-w-screen-xl mx-auto">
      <div className="space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Store className="w-4 h-4" />
            Get to Know Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            <span className="text-foreground">Where Ideas Meet</span>{" "}
            <span className="text-primary">Lifestyle</span>
          </h2>
          <p className="text-xl text-muted-foreground mx-auto text-pretty">
            We’re a creative studio that curates ideas and products to fit your
            lifestyle. Blending creativity with smart technology, we make
            discovery easier and more meaningful.
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
                ParentNestly is your trusted companion in the parenting journey
                — offering expert insights, product recommendations, and
                heartfelt advice.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded by parents, for parents, we understand the challenges
                and joys that come with raising children. Our mission is to make
                parenting easier by providing honest reviews, practical guides,
                and evidence-based tips that you can trust.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every product we recommend has been thoroughly tested and
                evaluated by our team of parent experts. We believe that
                informed parents make the best decisions for their families.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="group cursor-pointer bg-primary rounded-full"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group cursor-pointer rounded-full bg-foreground/5"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
