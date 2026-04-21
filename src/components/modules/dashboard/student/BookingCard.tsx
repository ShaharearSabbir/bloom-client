// app/dashboard/my-bookings/BookingCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Video, MessageSquare, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BookingCard({ booking }: { booking: any }) {
  return (
    <Card className="overflow-hidden border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all rounded-[2rem]">
      <CardContent className="p-0 flex flex-col sm:flex-row">
        <div className="p-6 flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={cn(
              "font-bold border-none",
              booking.status === "SUCCESS" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            )}>
              {booking.status}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black">
              {booking.tutor?.name[0]}
            </div>
            <div>
              <h3 className="font-black">{booking.tutor?.name}</h3>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">
                {booking.startTime} - {booking.endTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
            <Calendar className="h-4 w-4" />
            {format(new Date(booking.bookingDate), "PPP")}
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 flex flex-col justify-center gap-2 border-t sm:border-t-0 sm:border-l border-zinc-100 dark:border-zinc-800">
          <Button className="rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold">
            <Video className="h-4 w-4 mr-2" /> Join
          </Button>
          <Button variant="ghost" className="rounded-xl font-bold">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}