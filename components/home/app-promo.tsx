import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AppPromo() {
  return (
    <section className="container py-16">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Take LuxStay With You Everywhere
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Download our mobile app for a seamless booking experience. Get exclusive mobile-only deals and manage your reservations on the go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.21 2.33-.91 3.57-.84 1.5.1 2.63.64 3.38 1.64-3.03 1.81-2.52 6.11.68 7.47-.64 1.98-1.56 3.97-2.71 5.9zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.89 4.27-3.74 4.25z" />
                </svg>
                App Store
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.293-.707V2.521a1 1 0 0 1 .293-.707zM14.5 12.707l2.302 2.302-10.956 6.062 8.654-8.364zm0-1.414l-8.654-8.364 10.956 6.062L14.5 11.293zM16.803 14.5l-2.302 2.302-10.956 6.062V16.5l13.258-2zm0-5l-13.258-2v-6.364l10.956 6.062L16.803 9.5z" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
          <div className="relative h-80 md:h-full">
            <div className="absolute -bottom-10 right-0 w-full md:w-auto">
              <Image
                src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"
                alt="Mobile app interface"
                width={500}
                height={600}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
