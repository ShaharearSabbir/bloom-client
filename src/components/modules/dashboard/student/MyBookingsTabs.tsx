// app/dashboard/my-bookings/MyBookingsClient.tsx
"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import BookingCard from "./BookingCard";

export default function MyBookingsClient({
  initialBookings,
}: {
  initialBookings: any[];
}) {
  // Filter bookings based on status or date
  const upcoming = initialBookings.filter(
    (b) => b.status === "SUCCESS" || b.status === "PENDING",
  );
  const past = initialBookings.filter((b) => b.status === "COMPLETED");

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl mb-8">
        <TabsTrigger value="upcoming" className="rounded-lg px-8 font-bold">
          Upcoming
        </TabsTrigger>
        <TabsTrigger value="completed" className="rounded-lg px-8 font-bold">
          Past Sessions
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="upcoming"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {upcoming.length > 0 ? (
          upcoming.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <EmptyState message="No upcoming sessions scheduled." />
        )}
      </TabsContent>

      <TabsContent
        value="completed"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {past.length > 0 ? (
          past.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <EmptyState message="No past sessions found." />
        )}
      </TabsContent>
    </Tabs>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-[3rem] border-zinc-100 dark:border-zinc-800">
      <Calendar className="h-10 w-10 text-zinc-300 mb-4" />
      <p className="text-muted-foreground font-medium">{message}</p>
    </div>
  );
}
