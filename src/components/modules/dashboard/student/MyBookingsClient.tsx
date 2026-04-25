"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Video, ArrowUpDown } from "lucide-react";
import { Booking } from "@/types/bookings.type";
import { cn } from "@/lib/utils";
import { isJoinable } from "@/utils/isJoinable";
import { toast } from "sonner";
import { joinSession } from "@/actions/booking.action";

export default function MyBookingsClient({
  initialData,
  meta,
}: {
  initialData: Booking[];
  meta: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sort = searchParams.get("sort") || "desc";

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) =>
      params.set(key, String(value)),
    );
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleSort = () => {
    updateParams({ sort: sort === "asc" ? "desc" : "asc", page: 1 });
  };

  const handleJoin = async (bookingId: string) => {
    try {
      const res = await joinSession(bookingId);
      if (res.error) throw new Error(res.error);
      toast.success("Joined session successfully");
      router.refresh();
    } catch (err) {
      toast.error("Failed to join session");
    }
  };

  return (
    <div className="space-y-6">
      {/* Table Container - Added distinct background and rounded corners */}
      <div className="rounded-[2rem] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
            <TableRow className="border-zinc-100 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="font-black py-5 px-6 uppercase text-[10px] tracking-widest text-zinc-500">
                Tutor
              </TableHead>
              <TableHead
                className="font-black uppercase text-[10px] tracking-widest text-zinc-500 cursor-pointer hover:text-zinc-900 transition-colors"
                onClick={toggleSort}
              >
                <div className="flex items-center gap-1">
                  Date <ArrowUpDown className="h-3 w-3" />
                </div>
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
            {initialData.length > 0 ? (
              initialData.map((booking) => {
                const canJoin = isJoinable(
                  booking.bookingDate.toString(),
                  booking.startTime,
                  booking.endTime,
                );

                return (
                  <TableRow
                    key={booking.id}
                    className="border-zinc-100 dark:border-zinc-800"
                  >
                    <TableCell className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center font-black text-sm">
                          {booking.tutor?.[0] || "T"}
                        </div>
                        <span className="font-bold text-base">
                          {booking.tutor}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold">
                          {format(
                            new Date(booking.bookingDate),
                            "MMM do, yyyy",
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {booking.startTime}
                        </span>
                      </div>
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
                      <Button
                        onClick={() => handleJoin(booking.id)}
                        size="sm"
                        disabled={!canJoin || booking.status !== "CONFIRM"}
                        className={cn(
                          "rounded-xl font-bold transition-all",
                          canJoin
                            ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed",
                        )}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {canJoin ? "Join" : "Unavailable"}
                      </Button>

                      {!canJoin && (
                        <p className="text-[10px] text-zinc-400 mt-1 uppercase font-bold">
                          Opens 10m before
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Page {meta.page} of {meta.totalPages}
        </p>
        <div className="flex gap-2">
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
