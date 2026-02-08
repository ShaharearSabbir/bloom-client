"use client";

import { useState, useEffect, useMemo } from "react";
import { Save, Plus, CalendarClock, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

// Internal Component Imports
import AvailabilityCard from "./AvailabilityCard";
import {
  getMyAvailabilityAction,
  syncAvailabilityAction,
} from "@/actions/availability.action";

/**
 * Mapping helpers to bridge the gap between
 * Backend (numbers 0-6) and UI (Day Names)
 */
const dayMap: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const reverseDayMap: Record<string, number> = Object.fromEntries(
  Object.entries(dayMap).map(([k, v]) => [v, Number(k)]),
);

interface AvailabilityListProps {
  initialData?: any[];
}

export default function AvailabilityList({
  initialData = [],
}: AvailabilityListProps) {
  // 1. Transform initial data from server format (0-6) to UI format (Strings)
  const transformedInitial = useMemo(() => {
    return initialData.map((s: any) => ({
      id: s.id || crypto.randomUUID(),
      day: dayMap[s.dayOfWeek] || "Monday",
      start: s.startTime,
      end: s.endTime,
    }));
  }, [initialData]);

  // Core State
  const [slots, setSlots] = useState<any[]>(transformedInitial);
  // Track the "last saved" state to determine if the Save button should be enabled
  const [originalSlots, setOriginalSlots] = useState<any[]>(transformedInitial);

  const [isSaving, setIsSaving] = useState(false);

  /**
   * Derived State: Check if current slots differ from the last saved version
   */
  const isDirty = useMemo(() => {
    return JSON.stringify(slots) !== JSON.stringify(originalSlots);
  }, [slots, originalSlots]);

  /**
   * Sync Logic: Transform UI data back to numbers and send to Server Action
   */
  const handleSave = async () => {
    setIsSaving(true);

    // Prepare payload for backend (strings -> numbers)
    const payload = slots.map((s) => ({
      dayOfWeek: reverseDayMap[s.day],
      startTime: s.start,
      endTime: s.end,
    }));

    try {
      const res = await syncAvailabilityAction(payload);

      if (res.success) {
        toast.success("Schedule updated successfully!");

        // Update local state with the confirmed, sorted data from the server
        const transformed = res.data.map((s: any) => ({
          id: s.id,
          day: dayMap[s.dayOfWeek],
          start: s.startTime,
          end: s.endTime,
        }));

        setSlots(transformed);
        setOriginalSlots(JSON.parse(JSON.stringify(transformed)));
      } else {
        toast.error(res.error || "Failed to sync schedule");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * List Management Handlers
   */
  const addSlot = () => {
    setSlots([
      ...slots,
      {
        id: crypto.randomUUID(),
        day: "Monday",
        start: "09:00",
        end: "17:00",
      },
    ]);
  };

  const updateSlot = (id: string, updates: any) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  };

  const removeSlot = (id: string) => {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Alert className="bg-emerald-500/5 border-emerald-500/20">
        <Info className="h-4 w-4 text-emerald-600" />
        <AlertTitle className="text-emerald-600 font-semibold">
          Pro Tip
        </AlertTitle>
        <AlertDescription className="text-emerald-600/80">
          Your changes won't be visible to students until you hit{" "}
          <strong>Save Schedule</strong>.
        </AlertDescription>
      </Alert>

      {/* Slots Container */}
      <div className="grid gap-4">
        {slots.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-muted/30">
            <CalendarClock className="w-12 h-12 mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground font-medium">
              No availability slots set.
            </p>
            <Button
              variant="link"
              onClick={addSlot}
              className="text-emerald-600"
            >
              Add your first slot
            </Button>
          </div>
        ) : (
          slots.map((slot) => (
            <AvailabilityCard
              key={slot.id}
              slot={slot}
              onRemove={() => removeSlot(slot.id)}
              onUpdate={(updates) => updateSlot(slot.id, updates)}
            />
          ))
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t gap-4">
        <Button
          variant="outline"
          onClick={addSlot}
          className="gap-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Add Slot
        </Button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Reset changes button - only shows when there are unsaved changes */}
          {isDirty && !isSaving && (
            <Button
              variant="ghost"
              onClick={() =>
                setSlots(JSON.parse(JSON.stringify(originalSlots)))
              }
              className="text-muted-foreground"
            >
              Reset
            </Button>
          )}

          <Button
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 min-w-[160px] w-full sm:w-auto transition-all"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Schedule"}
          </Button>
        </div>
      </div>
    </div>
  );
}
