"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

type FormData = {
  email: string;
};

export function NewsletterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log("Form Data Submitted:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsLoading(false);
    reset(); // reset form after success
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {"You're all set!"}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Thank you for subscribing. {"We'll"} send you our latest updates and
            exclusive content.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 text-muted-foreground hover:text-foreground"
            onClick={() => setIsSubmitted(false)}
          >
            Subscribe another email
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-sm">
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-medium">
          <span className="dark:text-primary text-brand">
            Subscribe to our Newsletter
          </span>
        </h3>
        <p className="text-brand dark:text-primary mb-4 max-w-sm">
          Get parenting tips and product updates
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="pr-24 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="absolute right-1 top-1 h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                <span className="sr-only">Subscribing...</span>
              </div>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>

        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed">
          By subscribing, you agree to receive our newsletter and promotional
          emails. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
