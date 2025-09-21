"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CreditCard, Hotel, MapPin, Star, User } from "lucide-react";

// Sample user data
const user = {
  id: "u1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  memberSince: "January 2022",
  loyaltyPoints: 2450,
  loyaltyLevel: "Gold",
  paymentMethods: [
    {
      id: "pm1",
      type: "Visa",
      last4: "4242",
      expiry: "04/25",
      isDefault: true
    },
    {
      id: "pm2",
      type: "Mastercard",
      last4: "5555",
      expiry: "08/24",
      isDefault: false
    }
  ]
};

// Sample bookings data
const bookings = [
  {
    id: "b1",
    hotelName: "Grand Plaza Resort & Spa",
    location: "Bali, Indonesia",
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    checkIn: "2023-12-15",
    checkOut: "2023-12-20",
    roomType: "Deluxe Ocean View",
    guests: 2,
    totalPrice: 1495,
    status: "upcoming"
  },
  {
    id: "b2",
    hotelName: "Metropolitan Boutique Hotel",
    location: "Paris, France",
    image: "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
    checkIn: "2023-08-10",
    checkOut: "2023-08-15",
    roomType: "Executive Suite",
    guests: 2,
    totalPrice: 1745,
    status: "completed"
  },
  {
    id: "b3",
    hotelName: "Mountain View Lodge",
    location: "Aspen, Colorado",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    checkIn: "2023-02-20",
    checkOut: "2023-02-25",
    roomType: "Deluxe Suite",
    guests: 3,
    totalPrice: 1295,
    status: "completed"
  }
];

export default function AccountPage() {
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
    
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDeletePaymentMethod = (id: string) => {
    toast({
      title: "Payment method removed",
      description: "The selected payment method has been removed."
    });
  };
  
  const handleSetDefaultPaymentMethod = (id: string) => {
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated."
    });
  };
  
  const handleCancelBooking = (id: string) => {
    toast({
      title: "Booking cancellation",
      description: "Your booking has been cancelled. A refund will be processed according to the hotel's cancellation policy."
    });
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="mt-2 flex items-center">
                  <Badge variant="secondary" className="mt-2">
                    {user.loyaltyLevel} Member
                  </Badge>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p>{user.memberSince}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loyalty points</p>
                  <p>{user.loyaltyPoints} points</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  View Public Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="bookings">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>My Bookings</CardTitle>
                  <CardDescription>
                    View and manage your hotel reservations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Upcoming Stays</h3>
                      {bookings.filter(b => b.status === "upcoming").map((booking) => (
                        <div key={booking.id} className="mb-6">
                          <Card>
                            <CardContent className="p-0">
                              <div className="flex flex-col sm:flex-row">
                                <div className="relative h-48 sm:h-auto sm:w-1/3">
                                  <Image
                                    src={booking.image}
                                    alt={booking.hotelName}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-6 flex-1">
                                  <div className="flex flex-col sm:flex-row justify-between">
                                    <div>
                                      <h4 className="text-lg font-semibold">{booking.hotelName}</h4>
                                      <div className="flex items-center mt-1">
                                        <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                                        <span className="text-sm text-muted-foreground">{booking.location}</span>
                                      </div>
                                    </div>
                                    <Badge className="mt-2 sm:mt-0 w-fit">Upcoming</Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Check-in</p>
                                      <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Check-out</p>
                                      <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Room Type</p>
                                      <p className="font-medium">{booking.roomType}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Guests</p>
                                      <p className="font-medium">{booking.guests}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Total Price</p>
                                      <p className="text-lg font-bold">${booking.totalPrice}</p>
                                    </div>
                                    <div className="flex gap-2 mt-4 sm:mt-0">
                                      <Button variant="outline" size="sm">
                                        Modify
                                      </Button>
                                      <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => handleCancelBooking(booking.id)}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Past Stays</h3>
                      {bookings.filter(b => b.status === "completed").map((booking) => (
                        <div key={booking.id} className="mb-6">
                          <Card>
                            <CardContent className="p-0">
                              <div className="flex flex-col sm:flex-row">
                                <div className="relative h-48 sm:h-auto sm:w-1/3">
                                  <Image
                                    src={booking.image}
                                    alt={booking.hotelName}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-6 flex-1">
                                  <div className="flex flex-col sm:flex-row justify-between">
                                    <div>
                                      <h4 className="text-lg font-semibold">{booking.hotelName}</h4>
                                      <div className="flex items-center mt-1">
                                        <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                                        <span className="text-sm text-muted-foreground">{booking.location}</span>
                                      </div>
                                    </div>
                                    <Badge variant="outline" className="mt-2 sm:mt-0 w-fit">Completed</Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Check-in</p>
                                      <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Check-out</p>
                                      <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Room Type</p>
                                      <p className="font-medium">{booking.roomType}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Guests</p>
                                      <p className="font-medium">{booking.guests}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Total Price</p>
                                      <p className="text-lg font-bold">${booking.totalPrice}</p>
                                    </div>
                                    <div className="flex gap-2 mt-4 sm:mt-0">
                                      <Button variant="outline" size="sm">
                                        View Receipt
                                      </Button>
                                      <Button variant="secondary" size="sm">
                                        <Star className="mr-2 h-4 w-4" />
                                        Write Review
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleProfileUpdate}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileFormChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileForm.email}
                            onChange={handleProfileFormChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileFormChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={profileForm.address}
                            onChange={handleProfileFormChange}
                          />
                        </div>
                      </div>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordFormChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordFormChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordFormChange}
                        />
                      </div>
                      <Button type="submit">Update Password</Button>
                    </form>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive booking confirmations and updates</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Language Preference</p>
                          <p className="text-sm text-muted-foreground">Currently set to English</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Change
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Currency</p>
                          <p className="text-sm text-muted-foreground">Currently set to USD ($)</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Change
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Saved Payment Methods</h3>
                    <div className="space-y-4">
                      {user.paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-md mr-4">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {method.type} •••• {method.last4}
                                {method.isDefault && (
                                  <Badge variant="outline" className="ml-2">Default</Badge>
                                )}
                              </p>
                              <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!method.isDefault && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleSetDefaultPaymentMethod(method.id)}
                              >
                                Set as Default
                              </Button>
                            )}
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeletePaymentMethod(method.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-4">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                    <p>{user.address}</p>
                    <Button variant="outline" className="mt-4">
                      Update Billing Address
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Billing History</h3>
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{booking.hotelName}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${booking.totalPrice}</p>
                            <Button variant="link" size="sm" className="h-auto p-0">
                              View Receipt
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
