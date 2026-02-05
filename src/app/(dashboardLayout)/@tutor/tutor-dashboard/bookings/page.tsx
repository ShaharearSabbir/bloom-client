import BookingList from "@/components/modules/dashboard/tutor/BookingList";

export default function BookingPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">
          Track your upcoming tutoring sessions and lesson history.
        </p>
      </div>

      {/* Client Component for filtering and displaying bookings */}
      <BookingList />
    </div>
  );
}
