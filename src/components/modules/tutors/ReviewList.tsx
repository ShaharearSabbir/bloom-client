// components/modules/tutors/ReviewList.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  if (reviews.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black">Student Feedback</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{review.student.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm">{review.student.name}</p>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-zinc-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
