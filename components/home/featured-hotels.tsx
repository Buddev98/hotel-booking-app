"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

// Sample featured hotels data
const featuredHotels = [
  {
    id: "1",
    name: "Grand Plaza Resort & Spa",
    location: "Bali, Indonesia",
    description: "Luxury beachfront resort with private villas and world-class amenities",
    price: 299,
    rating: 4.8,
    reviews: 1245,
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    tags: ["Beachfront", "Spa", "Pool"],
    discount: 15
  },
  {
    id: "2",
    name: "Metropolitan Boutique Hotel",
    location: "Paris, France",
    description: "Elegant boutique hotel in the heart of the city with stunning views",
    price: 349,
    rating: 4.7,
    reviews: 892,
    image: "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
    tags: ["City Center", "Luxury", "Restaurant"],
    discount: null
  },
  {
    id: "3",
    name: "Mountain View Lodge",
    location: "Aspen, Colorado",
    description: "Cozy mountain retreat with ski-in/ski-out access and panoramic views",
    price: 259,
    rating: 4.9,
    reviews: 756,
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    tags: ["Mountain", "Ski Access", "Fireplace"],
    discount: 10
  },
  {
    id: "4",
    name: "Oceanfront Paradise Resort",
    location: "Cancun, Mexico",
    description: "All-inclusive beachfront resort with multiple pools and restaurants",
    price: 329,
    rating: 4.6,
    reviews: 1578,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    tags: ["All-Inclusive", "Beachfront", "Family-Friendly"],
    discount: null
  },
  {
    id: "5",
    name: "Historic City Inn",
    location: "Prague, Czech Republic",
    description: "Charming historic hotel in the old town with authentic architecture",
    price: 189,
    rating: 4.7,
    reviews: 643,
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    tags: ["Historic", "City Center", "Breakfast Included"],
    discount: 8
  }
];

export default function FeaturedHotels() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/30 py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Hotels</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Discover our handpicked selection of exceptional hotels and resorts around the world
            </p>
          </div>
          <Link href="/hotels">
            <Button variant="link" className="flex items-center p-0 mt-4 md:mt-0">
              View all hotels <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {featuredHotels.map((hotel) => (
              <CarouselItem key={hotel.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link href={`/hotels/${hotel.id}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <div className="relative h-64 w-full">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                      />
                      {hotel.discount && (
                        <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
                          {hotel.discount}% OFF
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">{hotel.location}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {hotel.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-muted-foreground text-sm ml-1">
                            ({hotel.reviews})
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-muted-foreground">From</span>
                          <p className="text-lg font-bold">${hotel.price}<span className="text-sm font-normal">/night</span></p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
