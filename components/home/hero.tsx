"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const heroImages = [
  {
    url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    alt: "Luxury hotel room with ocean view",
  },
  {
    url: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    alt: "Modern hotel lobby with elegant design",
  },
  {
    url: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    alt: "Beachfront resort with palm trees",
  },
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image.url})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Find Your Perfect Stay Anywhere in the World
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90">
          Discover amazing hotels, resorts, and vacation rentals with exclusive deals and personalized recommendations.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/hotels">
            <Button size="lg" className="text-base">
              Explore Hotels
            </Button>
          </Link>
          <Link href="/deals">
            <Button size="lg" variant="outline" className="text-base bg-transparent text-white border-white hover:bg-white/10">
              View Special Offers
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-2 w-2 rounded-full ${
              index === currentImage ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
