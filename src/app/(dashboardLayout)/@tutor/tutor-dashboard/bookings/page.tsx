// app/dashboard/tutor/bookings/page.tsx
import { getUserBookings } from "@/actions/booking.action";
import TutorBookingTable from "@/components/modules/dashboard/tutor/TutorBookingTable";

export default async function TutorBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page as string) || 1;
  const limit = parseInt(params.limit as string) || 10;

  const response = await getUserBookings(page, limit);
  const bookings = response?.data || [];
  const meta = response?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  console.log(bookings);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight">Student Requests</h1>
        <p className="text-muted-foreground text-sm">
          Manage your schedule and update session statuses.
        </p>
      </div>

      <TutorBookingTable initialData={bookings} meta={meta} />
    </div>
  );
}
