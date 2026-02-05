"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MoreVertical, MessageSquare } from "lucide-react";

export default function BookingCard({ booking }: { booking: any }) {
  const statusColors: any = {
    CONFIRMED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    COMPLETED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Main Info */}
          <div className="flex-1 p-6 flex flex-col md:flex-row gap-6">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-700 font-bold text-xl">
              {booking.tutorName[0]}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-1">
                <Badge
                  variant="outline"
                  className={statusColors[booking.status]}
                >
                  {booking.status}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  ID: {booking.id}
                </span>
              </div>
              <h3 className="font-bold text-xl">{booking.subject}</h3>
              <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                with{" "}
                <span className="text-foreground font-semibold">
                  {booking.tutorName}
                </span>
              </p>
            </div>
          </div>

          {/* Time & Price Section */}
          <div className="bg-accent/30 p-6 md:w-64 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>{booking.time}</span>
            </div>
            <div className="pt-2 text-lg font-bold">
              ${booking.amount.toFixed(2)}
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 flex md:flex-col gap-2 border-t md:border-t-0 md:border-l">
            <Button variant="ghost" size="icon" className="md:w-full">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="flex-1 md:w-full text-xs">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
