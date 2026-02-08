// src/app/dashboard/tutor/availability/page.tsx
import AvailabilityList from "@/components/modules/dashboard/tutor/AvailabilityList";
import { getMyAvailabilityAction } from "@/actions/availability.action";
import { Separator } from "@/components/ui/separator";

export default async function AvailabilityPage() {
  // Fetch data on the server
  const response = await getMyAvailabilityAction();
  const initialData = response.success ? response.data : [];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Availability Settings
        </h1>
        <p className="text-muted-foreground text-lg">
          Define your weekly teaching hours. Students can only book you during
          these windows.
        </p>
      </div>

      <Separator className="my-2" />

      {/* Main Content Area */}
      <div className="bg-card rounded-xl">
        {/* Pass initialData to prevent loading flashes */}
        <AvailabilityList initialData={initialData} />
      </div>

      {/* Footer Info */}
      <footer className="pt-10 border-t">
        <p className="text-xs text-center text-muted-foreground">
          All times are managed in your local timezone. Changes are atomic and
          will be reflected immediately across the platform after saving.
        </p>
      </footer>
    </div>
  );
}
