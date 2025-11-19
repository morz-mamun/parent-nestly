/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Mail, Heart, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function EmailSubscription() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>();

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      const res = await fetch("/api/admin/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          toast.error("This email is already subscribed!");
          return;
        }
        throw new Error(data.error || "Subscription failed");
      }

      setSubmitted(true);
      reset();
      toast.success("Subscription successful!");

      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };
  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="inline-flex">
                  <div className="w-14 h-14 bg-orange-200 dark:bg-orange-800 rounded-full flex items-center justify-center">
                    <Heart className="w-7 h-7 text-orange-600 dark:text-orange-300 fill-current" />
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                    Parenting Tips You Can Use Today
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Join thousands of parents getting weekly insights on child
                    development, activities, and practical solutions.
                  </p>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      No spam
                    </span>{" "}
                    — Just actionable advice for your family
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white dark:bg-slate-950 p-8 md:p-12 flex flex-col justify-center">
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Error message from server */}
                  {errors.root && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {errors.root.message}
                      </p>
                    </div>
                  )}

                  {/* Email Field */}
                  <label htmlFor="email" className="block">
                    <span className="text-sm font-semibold text-foreground mb-2 block">
                      Email Address
                    </span>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Enter a valid email",
                          },
                        })}
                      />
                    </div>

                    {/* Validation error */}
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-lg font-semibold transition duration-200 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Subscribe Now
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                /* Success UI */
                <div className="text-center space-y-4 py-4">
                  <div className="inline-flex">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Welcome aboard!
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Check your email for a welcome message.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
