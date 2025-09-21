import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg",
    hotels: 243,
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    image: "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg",
    hotels: 315,
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
    hotels: 189,
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg",
    hotels: 156,
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    image: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg",
    hotels: 201,
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    image: "https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg",
    hotels: 178,
  },
];

export default function DestinationGuide() {
  return (
    <section className="container py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Popular Destinations</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Explore top destinations with the best accommodations for your next adventure
          </p>
        </div>
        <Link href="/destinations">
          <Button variant="link" className="flex items-center p-0 mt-4 md:mt-0">
            View all destinations <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Link 
            key={destination.id} 
            href={`/destinations/${destination.id}`}
            className="group relative overflow-hidden rounded-lg h-72"
          >
            <div className="absolute inset-0">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold">{destination.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span>{destination.country}</span>
                <span className="text-sm">{destination.hotels} hotels</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
