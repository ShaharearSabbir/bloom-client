import { getUserBookings } from "@/actions/booking.action";
import MyBookingsClient from "@/components/modules/dashboard/student/MyBookingsTabs";

export default async function MyBooksPage() {
  // Fetch data on the server
  const response = await getUserBookings();
  const bookings = response?.data || [];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tighter">My Bookings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your learning schedule and join sessions.
        </p>
      </div>

      {/* Pass data to the Client Component for interactivity (Tabs) */}
      <MyBookingsClient initialBookings={bookings} />
    </div>
  );
}
