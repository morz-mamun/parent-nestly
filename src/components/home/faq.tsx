import { Globe } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { homePageFaq } from "@/constants/home-faq";

export default function HomeFAQ() {
  return (
    <section className="my-36 max-w-screen-xl mx-auto">
      <div className="space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Globe className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            <span className="text-foreground">Frequently Asked</span>{" "}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Get answers to the questions you might have about our website and
            services.
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mt-12 max-w-3xl mx-auto"
          defaultValue="item-1"
        >
          {homePageFaq?.map(({ value, title, content }) => (
            <AccordionItem key={value} value={value} className="">
              <AccordionTrigger className="cursor-pointer rounded-none px-3 w-full">
                {title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 p-3">
                {content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
