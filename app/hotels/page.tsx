"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Star, MapPin, Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample hotels data
const allHotels = [
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
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym", "Room Service", "Beach Access", "Airport Shuttle"],
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
    amenities: ["Free WiFi", "Restaurant", "Bar", "Room Service", "Concierge", "Laundry Service"],
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
    amenities: ["Free WiFi", "Fireplace", "Ski Storage", "Hot Tub", "Restaurant", "Bar", "Parking"],
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
    amenities: ["All-Inclusive", "Multiple Pools", "Kids Club", "Spa", "Water Sports", "Multiple Restaurants", "Beach Access"],
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
    amenities: ["Free WiFi", "Breakfast Included", "Bar", "Restaurant", "Concierge", "Airport Shuttle"],
    discount: 8
  },
  {
    id: "6",
    name: "Urban Loft Hotel",
    location: "Berlin, Germany",
    description: "Modern hotel with stylish loft-style rooms in a trendy neighborhood",
    price: 219,
    rating: 4.5,
    reviews: 512,
    image: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg",
    tags: ["Modern", "City Center", "Design"],
    amenities: ["Free WiFi", "Bar", "Breakfast Available", "Bike Rental", "Fitness Center"],
    discount: null
  },
  {
    id: "7",
    name: "Tropical Paradise Resort",
    location: "Phuket, Thailand",
    description: "Luxurious beachfront resort with private pool villas and tropical gardens",
    price: 279,
    rating: 4.8,
    reviews: 987,
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    tags: ["Beachfront", "Private Pool", "Spa"],
    amenities: ["Free WiFi", "Private Pools", "Spa", "Multiple Restaurants", "Beach Access", "Water Sports"],
    discount: 12
  },
  {
    id: "8",
    name: "Alpine Ski Lodge",
    location: "Zermatt, Switzerland",
    description: "Traditional Swiss chalet with modern amenities and stunning mountain views",
    price: 389,
    rating: 4.9,
    reviews: 423,
    image: "https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg",
    tags: ["Mountain", "Ski Access", "Luxury"],
    amenities: ["Free WiFi", "Ski-in/Ski-out", "Sauna", "Restaurant", "Bar", "Boot Warmers", "Equipment Rental"],
    discount: null
  }
];

// Common amenities for filtering
const amenitiesOptions = [
  "Free WiFi",
  "Pool",
  "Spa",
  "Restaurant",
  "Gym",
  "Room Service",
  "Beach Access",
  "Airport Shuttle",
  "Breakfast Included",
  "Parking",
  "Pet Friendly",
  "Bar",
  "All-Inclusive"
];

export default function HotelsPage() {
  const searchParams = useSearchParams();
  
  // Search and filter state
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [rating, setRating] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("recommended");
  
  // Filtered hotels
  const [filteredHotels, setFilteredHotels] = useState(allHotels);
  
  // Mobile filter visibility
  const [showFilters, setShowFilters] = useState(false);

  // Initialize search params
  useEffect(() => {
    if (searchParams) {
      const paramDestination = searchParams.get("destination");
      const paramCheckIn = searchParams.get("checkIn");
      const paramCheckOut = searchParams.get("checkOut");
      const paramGuests = searchParams.get("guests");
      const paramRooms = searchParams.get("rooms");
      
      if (paramDestination) setDestination(paramDestination);
      if (paramCheckIn) setCheckIn(new Date(paramCheckIn));
      if (paramCheckOut) setCheckOut(new Date(paramCheckOut));
      if (paramGuests) setGuests(paramGuests);
      if (paramRooms) setRooms(paramRooms);
    }
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let results = [...allHotels];
    
    // Filter by destination
    if (destination) {
      results = results.filter(hotel => 
        hotel.name.toLowerCase().includes(destination.toLowerCase()) || 
        hotel.location.toLowerCase().includes(destination.toLowerCase())
      );
    }
    
    // Filter by price range
    results = results.filter(hotel => 
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );
    
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      results = results.filter(hotel => 
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }
    
    // Filter by rating
    if (rating) {
      const ratingValue = parseFloat(rating);
      results = results.filter(hotel => hotel.rating >= ratingValue);
    }
    
    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default "recommended" sorting - no change
        break;
    }
    
    setFilteredHotels(results);
  }, [destination, priceRange, selectedAmenities, rating, sortBy]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedAmenities([]);
    setRating(null);
    setSortBy("recommended");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Hotel</h1>
      
      {/* Search bar */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search-destination" className="sr-only">Destination</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-destination"
                placeholder="Search destination, hotel name..."
                className="pl-9"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-full sm:w-[180px]",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "MMM d") : "Check-in"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-full sm:w-[180px]",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "MMM d") : "Check-out"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                  disabled={(date) => !checkIn || date <= checkIn || date < new Date()}
                />
              </PopoverContent>
            </Popover>
            
            <Button className="w-full sm:w-auto">
              Search
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 sticky top-20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                Clear all
              </Button>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Price Range</h3>
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
            
            {/* Star Rating */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Star Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2].map((stars) => (
                  <label key={stars} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      className="hidden"
                      checked={rating === stars.toString()}
                      onChange={() => setRating(stars.toString())}
                    />
                    <div className={`w-4 h-4 rounded-full border ${rating === stars.toString() ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                      {rating === stars.toString() && (
                        <div className="w-2 h-2 rounded-full bg-white mx-auto mt-1"></div>
                      )}
                    </div>
                    <div className="flex">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {Array.from({ length: 5 - stars }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Amenities */}
            <div>
              <h3 className="font-medium mb-4">Amenities</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {amenitiesOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <label
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          
          {/* Mobile filters */}
          {showFilters && (
            <div className="fixed inset-0 bg-background z-50 overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-xl">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
              
              {/* Star Rating */}
              <div className="mb-6">
                <h3 className="font-medium mb-4">Star Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2].map((stars) => (
                    <label key={stars} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating-mobile"
                        className="hidden"
                        checked={rating === stars.toString()}
                        onChange={() => setRating(stars.toString())}
                      />
                      <div className={`w-4 h-4 rounded-full border ${rating === stars.toString() ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                        {rating === stars.toString() && (
                          <div className="w-2 h-2 rounded-full bg-white mx-auto mt-1"></div>
                        )}
                      </div>
                      <div className="flex">
                        {Array.from({ length: stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        {Array.from({ length: 5 - stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Amenities */}
              <div className="mb-6">
                <h3 className="font-medium mb-4">Amenities</h3>
                <div className="space-y-2">
                  {amenitiesOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-mobile-${amenity}`}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <label
                        htmlFor={`amenity-mobile-${amenity}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button variant="outline" className="flex-1" onClick={clearFilters}>
                  Clear all
                </Button>
                <Button className="flex-1" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Hotel listings */}
        <div className="flex-1">
          {/* Sort options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {filteredHotels.length} hotels found
            </p>
            <div className="flex items-center">
              <span className="mr-2 text-sm hidden sm:inline">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Hotel cards */}
          <div className="space-y-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <Link key={hotel.id} href={`/hotels/${hotel.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-64 md:h-auto md:w-1/3">
                          <Image
                            src={hotel.image}
                            alt={hotel.name}
                            fill
                            className="object-cover"
                          />
                          {hotel.discount && (
                            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                              {hotel.discount}% OFF
                            </Badge>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm text-muted-foreground">{hotel.location}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {hotel.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {hotel.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {hotel.amenities.slice(0, 4).map((amenity) => (
                              <span key={amenity} className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                {amenity}
                              </span>
                            ))}
                            {hotel.amenities.length > 4 && (
                              <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                +{hotel.amenities.length - 4} more
                              </span>
                            )}
                          </div>
                          <div className="mt-auto flex items-center justify-between">
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No hotels found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria</p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
