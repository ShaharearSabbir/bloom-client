import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function FeaturedTutors() {
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
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border shadow-sm"
            >
              <div className="w-16 h-16 bg-zinc-200 rounded-full mb-4 animate-pulse" />
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                <Star size={14} fill="currentColor" />{" "}
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  4.9
                </span>
              </div>
              <h3 className="font-bold text-lg">Dr. Sarah Jenkins</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mathematics Specialist • 8+ Years Exp.
              </p>
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="font-bold">$45/hr</span>
                <Button variant="outline" size="sm">
                  Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
