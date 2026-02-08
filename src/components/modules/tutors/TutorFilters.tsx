// src/components/modules/tutors/TutorFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "English", "Music"];

function TutorFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-8 bg-white dark:bg-zinc-900 p-6 rounded-2xl border shadow-sm">
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
          Subjects
        </h3>
        <div className="space-y-3">
          {SUBJECTS.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={subject}
                checked={searchParams.get("subject") === subject}
                onCheckedChange={(checked) =>
                  updateFilters("subject", checked ? subject : "")
                }
              />
              <Label
                htmlFor={subject}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t">
        <div className="flex justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
            Max Price
          </h3>
          <span className="text-emerald-600 font-bold text-sm">
            ${searchParams.get("price") || "100"}
          </span>
        </div>
        <Slider
          defaultValue={[Number(searchParams.get("price")) || 100]}
          max={100}
          step={5}
          onValueChange={(vals) => updateFilters("price", vals[0].toString())}
        />
      </div>
    </div>
  );
}

export default TutorFilters;
