import { getFeaturedTutors } from "@/actions/tutor.Action";
import { Button } from "@/components/ui/button";
import { ActionResponse } from "@/types/action.type";
import { Tutor } from "@/types/tutor.type";
import { Star } from "lucide-react";
import TutorCard from "../tutors/TutorCard";
import Link from "next/link";

export default async function FeaturedTutors() {
  const fetchedData = (await getFeaturedTutors()) as ActionResponse<Tutor[]>;

  if (fetchedData.error) {
    return (
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold">Top-Rated Tutors</h2>
            <Link
              href="/tutors"
              className="text-emerald-600 font-medium cursor-pointer"
            >
              View all experts →
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            {fetchedData.error.message}
          </p>
        </div>
      </section>
    );
  }

  if (!fetchedData.data) {
    return (
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold">Top-Rated Tutors</h2>
            <span className="text-emerald-600 font-medium cursor-pointer">
              View all experts →
            </span>
          </div>
          <p className="text-sm text-muted-foreground">No tutors found.</p>
        </div>
      </section>
    );
  }

  const tutors = fetchedData.data;

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold">Top-Rated Tutors</h2>
          <span className="text-emerald-600 font-medium cursor-pointer">
            View all experts →
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tutors.map((i) => (
            <TutorCard key={i.id} tutor={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
