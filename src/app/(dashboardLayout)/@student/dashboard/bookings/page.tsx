
import { getUserBookings } from "@/actions/booking.action";
import MyBookingsClient from "@/components/modules/dashboard/student/MyBookingsClient";

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  // Fetch from your API
  const response = await getUserBookings(page, limit);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tighter">My Bookings</h1>
        <p className="text-muted-foreground mt-1">
          A chronological view of all your scheduled sessions.
        </p>
      </div>

      <MyBookingsClient
        initialData={response?.data || []}
        meta={response?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 }}
      />
    </div>
  );
}
