import TutorCard from "./TutorCard";
import SearchInput from "./SearchInput";
import Pagination from "@/components/shared/Pagination";
import { Tutor } from "@/types/tutor.type";


interface TutorListProps {
  initialData: Tutor[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
}

export default function TutorList({ initialData, meta }: TutorListProps) {
  return (
    <div className="space-y-6">
      {/* Search Input - Client Leaf */}
      <SearchInput />

      {/* Grid - Rendered on Server */}
      {initialData.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-muted-foreground">
            No tutors found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialData.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}

      {/* Pagination - Client Leaf */}
      {meta.totalPages > 1 && (
        <div className="pt-8">
          <Pagination totalPages={meta.totalPages} currentPage={meta.page} />
        </div>
      )}
    </div>
  );
}
