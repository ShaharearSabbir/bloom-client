
import AvailabilityList from "@/components/modules/dashboard/tutor/AvailabilityList";

export default function AvailabilityPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Availability Settings
          </h1>
          <p className="text-muted-foreground">
            Define your weekly teaching hours. Students can only book you during
            these windows.
          </p>
        </div>
      </div>

      <AvailabilityList />
    </div>
  );
}
