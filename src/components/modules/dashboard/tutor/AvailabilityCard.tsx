"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_SLOTS = Array.from({ length: 48 }).map((_, i) => {
  const hour = Math.floor(i / 2)
    .toString()
    .padStart(2, "0");
  const min = i % 2 === 0 ? "00" : "30";
  return `${hour}:${min}`;
});

interface SlotProps {
  slot: { day: string; start: string; end: string };
  onRemove: () => void;
  // Added onUpdate to the interface
  onUpdate: (
    updates: Partial<{ day: string; start: string; end: string }>,
  ) => void;
}

export default function AvailabilityCard({
  slot,
  onRemove,
  onUpdate,
}: SlotProps) {
  return (
    <Card className="border-none shadow-sm bg-card/50">
      <CardContent className="p-4 flex flex-col md:flex-row items-end gap-4">
        {/* Day Selection */}
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-xs font-bold uppercase text-muted-foreground">
            Day
          </label>
          <Select
            value={slot.day}
            onValueChange={(val) => onUpdate({ day: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DAYS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start Time Selection */}
        <div className="flex-[0.5] w-full space-y-1.5">
          <label className="text-xs font-bold uppercase text-muted-foreground">
            From
          </label>
          <Select
            value={slot.start}
            onValueChange={(val) => onUpdate({ start: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* End Time Selection */}
        <div className="flex-[0.5] w-full space-y-1.5">
          <label className="text-xs font-bold uppercase text-muted-foreground">
            To
          </label>
          <Select
            value={slot.end}
            onValueChange={(val) => onUpdate({ end: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Delete Action */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
