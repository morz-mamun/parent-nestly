"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Sparkles } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pr-24 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            required
          />
          <Button
            type="submit"
            disabled={isLoading || !email}
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
        <p className="text-sm text-muted-foreground leading-relaxed">
          By subscribing, you agree to receive our newsletter and promotional
          emails. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
