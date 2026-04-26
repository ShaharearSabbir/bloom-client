// components/modules/tutors/AddReviewForm.tsx
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { addReviewAction } from "@/actions/review.action";
import { auth } from "@/lib/auth-client";
import { toast } from "sonner";

export default function AddReviewForm({ tutorId }: { tutorId: string }) {
  const [rating, setRating] = useState(5);
  const [isPending, startTransition] = useTransition();

  const session = auth.useSession();

  const isLoading = session.isPending;

  if (isLoading) {
    return (
      <div className="p-6 border-2 border-dashed rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 text-center">
        <p className="font-bold text-zinc-600">Loading...</p>
      </div>
    );
  }

  const user = session.data?.user;

  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    return (
      <div className="p-6 border-2 border-dashed rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 text-center">
        <p className="font-bold text-zinc-600">
          Please log in to leave a review.
        </p>
      </div>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addReviewAction(formData, tutorId, rating);

      if (result.error) {
        toast.error(result.error.message);
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 space-y-4"
    >
      <h3 className="font-black text-lg">Leave a Review</h3>

      {/* Star Picker */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="hover:scale-110 transition-transform"
          >
            <Star
              className={`h-6 w-6 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-zinc-300"}`}
            />
          </button>
        ))}
      </div>

      <Textarea
        name="comment"
        placeholder="Share your experience with this tutor..."
        className="min-h-25 rounded-xl border-zinc-200"
        required
      />

      <Button
        disabled={isPending}
        className="w-full rounded-xl font-bold bg-zinc-950 text-white"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
