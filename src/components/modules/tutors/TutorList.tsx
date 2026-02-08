// src/components/modules/tutors/TutorList.tsx
"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import TutorCard from "./TutorCard";

interface TutorListProps {
  initialData: any[];
}

export default function TutorList({ initialData }: TutorListProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Get filter values from URL
  const selectedSubject = searchParams.get("subject");
  const maxPrice = searchParams.get("price");

  const filteredTutors = useMemo(() => {
    return initialData.filter((tutor) => {
      const matchesSearch =
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.bio.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject =
        !selectedSubject || tutor.subjects.includes(selectedSubject);
      const matchesPrice = !maxPrice || tutor.hourlyRate <= Number(maxPrice);

      return matchesSearch && matchesSubject && matchesPrice;
    });
  }, [initialData, searchQuery, selectedSubject, maxPrice]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-emerald-600 transition-colors" />
        <Input
          placeholder="Search by name, expertise, or keywords..."
          className="pl-10 h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm focus-visible:ring-emerald-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid */}
      {filteredTutors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
          <p className="text-muted-foreground">
            No tutors found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}
