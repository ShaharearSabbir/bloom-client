"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { Booking } from "@/types/admin.type"; // Or wherever your Booking interface is saved
import { Meta } from "@/types/action.type";

export default function BookingTable({
  initialData,
  meta,
  currentPage,
}: {
  initialData: Booking[];
  meta: Meta;
  currentPage: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [bookings, setBookings] = useState<Booking[]>(initialData);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [isPending, startTransition] = useTransition();

  // Sync state when server data updates (e.g., page changing)
  useEffect(() => {
    setBookings(initialData);
  }, [initialData]);

  // Debounce Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentUrlSearch = searchParams.get("search") || "";
      if (searchTerm !== currentUrlSearch) {
        const params = new URLSearchParams(searchParams);
        searchTerm ? params.set("search", searchTerm) : params.delete("search");
        params.set("page", "1"); // Reset to page 1 on search
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="Search by tutor, student, or category..."
          className="pl-10 rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isPending && (
          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-zinc-400" />
        )}
      </div>

      {/* Flat Table Container */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow
                  key={booking.id}
                  className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50"
                >
                  <TableCell className="font-mono text-xs max-w-30 truncate text-muted-foreground">
                    {booking.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      {booking.tutor.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      ID: {booking.tutor.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      {booking.student.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      ID: {booking.student.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      {booking.category.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1).toLowerCase()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {meta?.totalPages || 1}
        </p>
        <div className="flex gap-2">
          <Button
            disabled={currentPage <= 1 || isPending}
            variant="outline"
            onClick={() => router.push(`${pathname}?page=${currentPage - 1}`)}
          >
            Previous
          </Button>
          <Button
            disabled={currentPage >= (meta?.totalPages || 1) || isPending}
            variant="outline"
            onClick={() => router.push(`${pathname}?page=${currentPage + 1}`)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
