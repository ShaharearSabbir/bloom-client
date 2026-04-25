"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, addDays, isSameDay, startOfDay } from "date-fns";
import {
  Clock,
  CheckCircle2,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { auth } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBooking } from "@/actions/booking.action";

// Added this to handle the mapping of your DB dayOfWeek to JS getDay()
const DAYS_MAP = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function BookingDialog({
  tutor,
  className,
}: {
  tutor: any;
  className?: string;
}) {
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  console.log("Tutor Data in BookingDialog:", tutor);

  const days = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  const { data: sessionData } = auth.useSession();

  const user = sessionData?.user;

  // --- SLOT GENERATION BASED ON AVAILABILITY ---

  const generateSlotsForDate = (date: Date) => {
    const slots = [];

    // JavaScript getDay() returns 0 (Sun) to 6 (Sat)
    // Your DB uses 1 (Mon), 2 (Tue), 3 (Wed) based on your image
    const currentDayNum = date.getDay();

    // Find availability where dayOfWeek matches the selected day number
    const dayAvailability = tutor.availability?.find(
      (a: any) => Number(a.dayOfWeek) === currentDayNum,
    );

    // If no availability is found for this day number, return empty
    if (!dayAvailability) return [];

    // Parse strings "09:00" and "17:00" from your data
    const startHour = parseInt(dayAvailability.startTime.split(":")[0]);
    const endHour = parseInt(dayAvailability.endTime.split(":")[0]);

    for (let hour = startHour; hour < endHour; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;

      // Check if this specific hour is already in upcomingBookings
      const isBooked = tutor.upcomingBookings?.some(
        (b: any) =>
          isSameDay(new Date(b.bookingDate), date) &&
          b.startTime === timeString,
      );

      const isSelected = selectedSlots.some(
        (s) => isSameDay(new Date(s.date), date) && s.time === timeString,
      );

      slots.push({ time: timeString, isBooked, isSelected });
    }
    return slots;
  };

  const currentSlots = generateSlotsForDate(activeDate);
  const totalCost = selectedSlots.length * tutor.hourlyRate;

  const toggleSlot = (time: string) => {
    const isAlreadySelected = selectedSlots.find(
      (s) => isSameDay(new Date(s.date), activeDate) && s.time === time,
    );
    if (isAlreadySelected) {
      setSelectedSlots(
        selectedSlots.filter(
          (s) => !(isSameDay(new Date(s.date), activeDate) && s.time === time),
        ),
      );
    } else {
      setSelectedSlots([...selectedSlots, { date: activeDate, time }]);
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);

    if (!user) {
      toast.error("You must be logged in to book a session.");
      route.push("/login");
      setIsSubmitting(false);
      return;
    }

    const finalData = selectedSlots.map((slot) => {
      const startHour = parseInt(slot.time.split(":")[0]);
      const endHour = (startHour + 1).toString().padStart(2, "0") + ":00";
      return {
        studentId: user?.id,
        tutorId: tutor.id,
        categoryId: tutor.categoryId,
        bookingDate: startOfDay(slot.date).toISOString(),
        startTime: slot.time,
        endTime: endHour,
        totalFees: tutor.hourlyRate,
        status: "PENDING",
      };
    });

    console.log("data from bookingDialog", finalData);

    const response = await createBooking(finalData);

    if (response.error) {
      toast.error(response.error.message || "Failed to create booking.");
    }

    toast.success("Booking created successfully.");
    setIsOpen(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            className
              ? className
              : " w-full h-14 rounded-2xl text-lg font-bold bg-zinc-950 dark:bg-white dark:text-zinc-950 hover:bg-emerald-600 transition-all"
          }
        >
          Book a Session
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl w-[95vw] h-[85vh] p-0 flex flex-col overflow-hidden rounded-[2rem] border-none bg-white dark:bg-zinc-950">
        <div className="p-6 md:p-8 shrink-0 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-black tracking-tighter">
              Schedule with {tutor.name}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Select from available working hours.
            </p>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* 1. Date Selection */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" /> 1. Select Date
            </h4>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-3 pb-4">
                {days.map((day) => {
                  const isSelected = isSameDay(day, activeDate);
                  return (
                    <button
                      key={day.toString()}
                      onClick={() => setActiveDate(day)}
                      className={cn(
                        "flex flex-col items-center justify-center min-w-18.75 h-20 rounded-2xl border-2 transition-all",
                        isSelected
                          ? "bg-zinc-950 border-zinc-950 dark:bg-white dark:border-white text-white dark:text-zinc-950 shadow-md"
                          : "bg-zinc-50 dark:bg-zinc-900 border-transparent hover:border-emerald-500",
                      )}
                    >
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                        {format(day, "EEE")}
                      </span>
                      <span className="text-xl font-black">
                        {format(day, "d")}
                      </span>
                    </button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* 2. Time Slots */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" /> 2. Available Slots for{" "}
              {format(activeDate, "eeee, MMM do")}
            </h4>

            {currentSlots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {currentSlots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={slot.isBooked}
                    onClick={() => toggleSlot(slot.time)}
                    className={cn(
                      "relative py-4 rounded-xl border-2 text-sm font-bold transition-all",
                      slot.isBooked
                        ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 border-transparent cursor-not-allowed line-through opacity-40"
                        : slot.isSelected
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-md scale-95"
                          : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-emerald-500 hover:text-emerald-600",
                    )}
                  >
                    {slot.time}
                    {slot.isSelected && (
                      <CheckCircle2 className="absolute top-1 right-1 h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 px-6 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
                <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">
                  Tutor is not available on this day.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 shrink-0 bg-zinc-50 dark:bg-zinc-900/50 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {selectedSlots.length} hours selected
              </p>
              <p className="text-4xl font-black tracking-tighter">
                ${totalCost}
              </p>
            </div>

            <Button
              disabled={selectedSlots.length === 0 || isSubmitting}
              onClick={handleConfirm}
              className="w-full md:w-auto px-10 h-14 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black text-lg shadow-xl active:scale-95 disabled:opacity-20 transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Confirm & Book"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
