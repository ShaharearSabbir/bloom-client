"use client";

import { useState } from "react";
import { Save, Plus, CalendarClock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AvailabilityCard from "./AvailabilityCard";


export default function AvailabilityList() {
  const [slots, setSlots] = useState([
    { id: "1", day: "Monday", start: "09:00", end: "17:00" },
  ]);


  const addSlot = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setSlots([
      ...slots,
      { id: newId, day: "Monday", start: "09:00", end: "17:00" },
    ]);
  };

  const removeSlot = (id: string) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-emerald-500/5 border-emerald-500/20">
        <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <AlertTitle className="text-emerald-600 dark:text-emerald-400 font-semibold">
          Pro Tip
        </AlertTitle>
        <AlertDescription className="text-emerald-600/80 dark:text-emerald-400/80">
          Your changes won't be visible to students until you hit "Save
          Schedule".
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {slots.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl opacity-50">
            <CalendarClock className="w-12 h-12 mb-2" />
            <p>No availability slots added yet.</p>
          </div>
        ) : (
          slots.map((slot) => (
            <AvailabilityCard
              key={slot.id}
              slot={slot}
              onRemove={() => removeSlot(slot.id)}
            />
          ))
        )}
      </div>

      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={addSlot} className="gap-2">
          <Plus className="w-4 h-4" /> Add Slot
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
          <Save className="w-4 h-4" /> Save Schedule
        </Button>
      </div>
    </div>
  );
}
