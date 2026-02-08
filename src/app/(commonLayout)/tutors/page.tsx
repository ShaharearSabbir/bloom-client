// src/app/tutors/page.tsx
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import TutorList from "@/components/modules/tutors/TutorList";
import { getTutors } from "@/actions/tutor.Action";
import TutorFilters from "@/components/modules/tutors/TutorFilters";

export default async function TutorsPage() {
  // Initial fetch for the first load
  const response = await getTutors();
  const initialTutors = response.data.success ? response.data.data : [];

  console.log(initialTutors);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-10 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Find your perfect tutor
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Browse through our verified experts and find someone tailored to
            your learning goals.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Client Side Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <TutorFilters />
          </aside>

          {/* Main List Section */}
          <main className="flex-1">
            <Suspense
              fallback={
                <div className="flex justify-center p-20">
                  <Loader2 className="animate-spin" />
                </div>
              }
            >
              <TutorList initialData={initialTutors} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
