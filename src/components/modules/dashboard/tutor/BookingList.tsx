"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CalendarX } from "lucide-react";
import BookingCard from "./BookingCard";

export default function BookingList() {
  // In a real app, you would pass data from the server or fetch it here
  const [bookings] = useState([
    {
      id: "BK-102",
      tutorName: "Dr. Sarah Chen",
      subject: "Advanced React Patterns",
      date: "Feb 15, 2026",
      time: "10:00 AM - 11:30 AM",
      status: "CONFIRMED",
      amount: 45.0,
    },
    {
      id: "BK-99",
      tutorName: "James Miller",
      subject: "PostgreSQL Optimization",
      date: "Jan 28, 2026",
      time: "02:00 PM - 03:00 PM",
      status: "COMPLETED",
      amount: 30.0,
    },
  ]);

  const upcoming = bookings.filter(
    (b) => b.status === "CONFIRMED" || b.status === "PENDING",
  );
  const past = bookings.filter(
    (b) => b.status === "COMPLETED" || b.status === "CANCELLED",
  );

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past Sessions</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="space-y-4">
        {upcoming.length > 0 ? (
          upcoming.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <EmptyState message="No upcoming sessions found." />
        )}
      </TabsContent>

      <TabsContent value="past" className="space-y-4">
        {past.length > 0 ? (
          past.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <EmptyState message="You haven't completed any sessions yet." />
        )}
      </TabsContent>
    </Tabs>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-2xl opacity-60">
      <CalendarX className="w-12 h-12 mb-4 text-muted-foreground" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
