"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Star, MapPin, Wifi, Coffee, Utensils, Dumbbell, Car, Waves, Plane, Check, CalendarIcon, Users } from "lucide-react";

// Sample hotel data
const hotels = [
  {
    id: "1",
    name: "Grand Plaza Resort & Spa",
    location: "Bali, Indonesia",
    description: "Nestled on the pristine shores of Nusa Dua, Grand Plaza Resort & Spa offers an unparalleled luxury experience in Bali. This beachfront paradise features elegantly appointed rooms and private villas, each designed to provide maximum comfort and stunning ocean views. Immerse yourself in the resort's lush tropical gardens, relax by the infinity pools, or indulge in rejuvenating treatments at our world-class spa.",
    price: 299,
    rating: 4.8,
    reviews: 1245,
    images: [
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg"
    ],
    tags: ["Beachfront", "Spa", "Pool"],
    amenities: [
      { name: "Free WiFi", icon: Wifi },
      { name: "Breakfast Included", icon: Coffee },
      { name: "Restaurant", icon: Utensils },
      { name: "Fitness Center", icon: Dumbbell },
      { name: "Parking", icon: Car },
      { name: "Beach Access", icon: Waves },
      { name: "Airport Shuttle", icon: Plane }
    ],
    discount: 15,
    roomTypes: [
      {
        id: "deluxe",
        name: "Deluxe Ocean View",
        price: 299,
        description: "Spacious room with king-size bed and private balcony overlooking the ocean",
        capacity: 2,
        amenities: ["Ocean View", "40m²", "King Bed", "Balcony", "Air Conditioning", "Mini Bar"],
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
      },
      {
        id: "suite",
        name: "Executive Suite",
        price: 459,
        description: "Luxurious suite with separate living area and premium ocean views",
        capacity: 3,
        amenities: ["Ocean View", "65m²", "King Bed", "Separate Living Area", "Sofa Bed", "Premium Amenities"],
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
      },
      {
        id: "villa",
        name: "Private Pool Villa",
        price: 699,
        description: "Exclusive villa with private pool, garden, and direct beach access",
        capacity: 4,
        amenities: ["Private Pool", "120m²", "King Bed", "Separate Living & Dining", "Butler Service", "Direct Beach Access"],
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
      }
    ],
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in. Cancellations made within 48 hours of check-in are subject to a one-night charge.",
      children: "Children of all ages are welcome. Children under 12 stay free when using existing bedding.",
      pets: "Pets are not allowed.",
      extraBeds: "Extra beds are available for $50 per night."
    },
    location: {
      address: "Jl. Pantai Nusa Dua, Benoa, Kec. Kuta Sel., Kabupaten Badung, Bali 80363, Indonesia",
      coordinates: { lat: -8.8, lng: 115.2 },
      description: "Located on Nusa Dua Beach, 20 minutes from Ngurah Rai International Airport. The resort is within walking distance to Bali Collection shopping center and a short drive to water sports activities and cultural attractions.",
      nearby: [
        { name: "Ngurah Rai International Airport", distance: "12 km" },
        { name: "Bali Collection Shopping Center", distance: "800 m" },
        { name: "Nusa Dua Beach", distance: "0 km" },
        { name: "Bali National Golf Club", distance: "2.5 km" },
        { name: "Waterblow Spot", distance: "3 km" }
      ]
    },
    reviews: [
      {
        id: "r1",
        user: "Sarah Johnson",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        rating: 5,
        date: "2023-08-15",
        title: "Exceptional luxury and service",
        comment: "Our stay at Grand Plaza was absolutely perfect. The staff went above and beyond to make our honeymoon special. The private villa with ocean view was breathtaking, and the food at all restaurants was exceptional. We particularly enjoyed the spa treatments and the infinity pool. Will definitely return!"
      },
      {
        id: "r2",
        user: "Michael Chen",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        rating: 4,
        date: "2023-07-22",
        title: "Beautiful property with minor issues",
        comment: "The resort is stunning and the location is perfect. Our room had an amazing view and was very comfortable. The only issues we encountered were some delays at check-in and occasionally slow service at the main restaurant during peak hours. Despite these minor inconveniences, we had a wonderful stay."
      },
      {
        id: "r3",
        user: "Emma Rodriguez",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        rating: 5,
        date: "2023-09-03",
        title: "Paradise found!",
        comment: "This resort is truly a slice of paradise. The grounds are immaculately maintained, the beach is pristine, and the staff remembers your name from day one. We stayed in the Private Pool Villa and it was worth every penny. Complete privacy, gorgeous design, and the personal butler service made this the best hotel experience we've ever had."
      }
    ]
  }
];

export default function HotelDetailPage() {
  const params = useParams();
  const hotelId = params.id as string;
  
  // Find the hotel by ID (in a real app, this would be an API call)
  const hotel = hotels.find(h => h.id === hotelId) || hotels[0]; // Fallback to first hotel if not found
  
  // State for booking
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [selectedRoom, setSelectedRoom] = useState(hotel.roomTypes[0].id);
  
  // Calculate total price
  const selectedRoomData = hotel.roomTypes.find(room => room.id === selectedRoom);
  const nights = checkIn && checkOut 
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) 
    : 1;
  const basePrice = selectedRoomData ? selectedRoomData.price * nights : 0;
  const discountAmount = hotel.discount ? (basePrice * hotel.discount / 100) : 0;
  const totalPrice = basePrice - discountAmount;

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/hotels" className="hover:text-foreground">Hotels</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{hotel.name}</span>
      </div>
      
      {/* Hotel Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <div className="flex items-center mt-2">
            <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-muted-foreground">{hotel.location}</span>
            <div className="flex items-center ml-4">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{hotel.rating}</span>
              <span className="text-muted-foreground text-sm ml-1">
                ({hotel.reviews.length} reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>Book Now</Button>
        </div>
      </div>
      
      {/* Image Gallery */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
          <div className="col-span-1 md:col-span-2 row-span-2 relative rounded-lg overflow-hidden">
            <Image
              src={hotel.images[0]}
              alt={hotel.name}
              fill
              className="object-cover"
            />
          </div>
          {hotel.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden hidden md:block">
              <Image
                src={image}
                alt={`${hotel.name} - Image ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2">
          {/* Hotel Description */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">About This Hotel</h2>
            <p className="text-muted-foreground mb-6">{hotel.description}</p>
            
            <h3 className="text-lg font-semibold mb-3">Top Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <amenity.icon className="h-5 w-5 mr-2 text-primary" />
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Room Types */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Rooms</h2>
            <div className="space-y-6">
              {hotel.roomTypes.map((room) => (
                <Card key={room.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{room.name}</h3>
                          <p className="text-muted-foreground mt-1">{room.description}</p>
                        </div>
                        <div className="text-right mt-4 md:mt-0">
                          <p className="text-lg font-bold">${room.price}<span className="text-sm font-normal">/night</span></p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Room Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity, index) => (
                            <Badge key={index} variant="secondary">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-sm">Up to {room.capacity} guests</span>
                        </div>
                        <Button
                          variant={selectedRoom === room.id ? "default" : "outline"}
                          onClick={() => setSelectedRoom(room.id)}
                        >
                          {selectedRoom === room.id ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Tabs for more information */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 mb-8">
            <Tabs defaultValue="policies">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="policies" className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Check-in/Check-out</h3>
                    <p className="text-muted-foreground mt-1">Check-in: {hotel.policies.checkIn} • Check-out: {hotel.policies.checkOut}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Cancellation Policy</h3>
                    <p className="text-muted-foreground mt-1">{hotel.policies.cancellation}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Children Policy</h3>
                    <p className="text-muted-foreground mt-1">{hotel.policies.children}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Pet Policy</h3>
                    <p className="text-muted-foreground mt-1">{hotel.policies.pets}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Extra Beds</h3>
                    <p className="text-muted-foreground mt-1">{hotel.policies.extraBeds}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground mt-1">{hotel.location.address}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">About the Area</h3>
                    <p className="text-muted-foreground mt-1">{hotel.location.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Nearby Attractions</h3>
                    <ul className="mt-2 space-y-2">
                      {hotel.location.nearby.map((place, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{place.name}</span>
                          <span className="text-muted-foreground">{place.distance}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 h-[300px] bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map would be displayed here</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-2xl font-bold">{hotel.rating}</span>
                    </div>
                    <p className="text-muted-foreground">Based on {hotel.reviews.length} reviews</p>
                  </div>
                  
                  <Separator />
                  
                  {hotel.reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={review.avatar}
                              alt={review.user}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{review.user}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-medium">{review.title}</h4>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Booking Card */}
        <div className="col-span-1">
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
                <CardDescription>Select dates and room type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="check-in">Check-in</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="check-in"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkIn && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "PPP") : "Select date"}
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="check-out">Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="check-out"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkOut && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "PPP") : "Select date"}
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guests">Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger id="guests">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="room-type">Room Type</Label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger id="room-type">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotel.roomTypes.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} - ${room.price}/night
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base price ({nights} {nights === 1 ? "night" : "nights"})</span>
                    <span>${basePrice}</span>
                  </div>
                  {hotel.discount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({hotel.discount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
