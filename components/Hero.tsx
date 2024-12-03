// components/Hero.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

// components/Hero.tsx
interface HeroButton {
  readonly title: string;
  readonly href: string;
  readonly variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

interface HeroProps {
  heading: string;
  description: string;
  buttons: readonly HeroButton[]; // Changed from HeroButton[] to readonly HeroButton[]
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function Hero({
  heading,
  description,
  buttons,
  imageSrc,
  imageAlt,
  className,
}: HeroProps) {
  return (
    <section className={cn("w-full", className)}>
      {" "}
      {/* Removed default padding here */}
      <div className='mx-auto mt-32 px-4 md:px-6 container'>
        {" "}
        {/* Added mx-auto */}
        <div className='flex flex-col justify-center items-center space-y-8'>
          {" "}
          {/* Increased space-y and added justify-center */}
          <div className='space-y-8 max-w-[800px] text-center'>
            {" "}
            {/* Added max-width container and increased space-y */}
            <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none tracking-tighter'>
              {heading}
            </h1>
            <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
              {description}
            </p>
          </div>
          <div className='flex flex-wrap justify-center items-center gap-4'>
            {buttons.map((button, index) => (
              <Link key={index} href={button.href}>
                <Button
                  variant={button.variant || "default"}
                  size='lg'
                  className='min-w-[140px]'
                >
                  {button.title}
                </Button>
              </Link>
            ))}
          </div>
          {imageSrc && (
            <div className='mt-12 w-full max-w-5xl'>
              {" "}
              {/* Adjusted spacing */}
              <Image
                src={imageSrc}
                alt={imageAlt || "Hero image"}
                className='rounded-lg w-full aspect-[2/1] object-cover'
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
// Default values that can be exported and reused
export const heroDefaults = {
  heading: "Your Professional Bluesky Presence",
  description:
    "Manage your online presence, engage with your audience, and monetize your content - all built on the AT Protocol.",
  buttons: [
    {
      title: "Get Started",
      href: "/login",
      variant: "default",
    },
    {
      title: "Learn More",
      href: "/features",
      variant: "outline",
    },
  ],
  imageSrc:
    "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
  imageAlt: "Bluesletter platform preview",
};
