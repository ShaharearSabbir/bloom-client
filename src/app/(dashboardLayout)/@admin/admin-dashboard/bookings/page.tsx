import { getAllBookings } from "@/actions/admin.action"; // Update with your actual action path
import BookingTable from "@/components/modules/dashboard/admin/BookingTable";
import { Meta } from "@/types/action.type";
import { Booking } from "@/types/admin.type";

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;

  const page = isNaN(Number(params.page)) ? 1 : Number(params.page);
  const search = params.search || "";

  const response = await getAllBookings({ page, limit: 10, search });

  if (!response) return null;

  const bookings: Booking[] = response.data || [];
  const meta = response.meta as Meta;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50">
        Booking Management
      </h1>

      {/* Passing the key forces a clean redraw whenever query parameters cycle */}
      <BookingTable
        key={`${page}-${search}`}
        initialData={bookings}
        meta={meta}
        currentPage={page}
      />
    </div>
  );
}
