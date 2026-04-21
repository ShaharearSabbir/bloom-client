"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";
import { updateBookingStatus } from "@/actions/booking.action";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TutorBookingTable({
  initialData,
  meta,
}: {
  initialData: any[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Helper to update URL params
  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const res = await updateBookingStatus(bookingId, newStatus);
      if (res.error) throw new Error(res.error);
      toast.success(`Booking ${newStatus.toLowerCase()} successfully`);
      router.refresh(); // Refresh page to get latest data from server
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="rounded-[2rem] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
            <TableRow className="border-zinc-100 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="font-black py-5 px-6 uppercase text-[10px] tracking-widest text-zinc-500">
                Student
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-zinc-500">
                Date & Time
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-zinc-500">
                Fee
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-zinc-500">
                Status
              </TableHead>
              <TableHead className="font-black text-right px-6 uppercase text-[10px] tracking-widest text-zinc-500">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((booking) => (
              <TableRow
                key={booking.id}
                className="border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <TableCell className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center font-black text-sm">
                      {booking.student?.name?.[0] || "S"}
                    </div>
                    <span className="font-bold">{booking.student?.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {format(new Date(booking.bookingDate), "MMM do, yyyy")}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-black">
                  ${booking.totalFees}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "rounded-lg font-bold border-none px-3 py-1",
                      booking.status === "COMPLETED"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700",
                    )}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6">
                  <Select
                    defaultValue={booking.status}
                    onValueChange={(val) => handleStatusChange(booking.id, val)}
                  >
                    <SelectTrigger className="w-32 ml-auto rounded-xl font-bold bg-zinc-50 dark:bg-zinc-900 border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl font-bold">
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="CONFIRM">Confirm</SelectItem>
                      <SelectItem value="CANCELED">Cancel</SelectItem>
                      <SelectItem value="COMPLETED">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
          Showing page {meta.page} of {meta.totalPages}
        </p>

        <div className="flex items-center gap-2">
          <Select
            value={String(meta.limit)}
            onValueChange={(val) => updateParams({ limit: val, page: 1 })}
          >
            <SelectTrigger className="w-24 rounded-xl font-bold bg-white dark:bg-zinc-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl font-bold">
              <SelectItem value="5">5 / pg</SelectItem>
              <SelectItem value="10">10 / pg</SelectItem>
              <SelectItem value="20">20 / pg</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            disabled={meta.page <= 1}
            onClick={() => updateParams({ page: meta.page - 1 })}
            className="rounded-xl font-bold"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            disabled={meta.page >= meta.totalPages}
            onClick={() => updateParams({ page: meta.page + 1 })}
            className="rounded-xl font-bold"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
