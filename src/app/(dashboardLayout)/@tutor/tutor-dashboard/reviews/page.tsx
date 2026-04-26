import { getTutorReviews } from "@/actions/review.action";
import ReviewList from "@/components/modules/dashboard/tutor/ReviewList";
import ReviewStats from "@/components/modules/dashboard/tutor/ReviewStats";
import { TutorReview } from "@/types/review.type";

export default async function ReviewsPage() {
  const reviewsData = await getTutorReviews();

  if (reviewsData.error) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Student Reviews</h1>
          <p className="text-muted-foreground">
            Manage and respond to feedback from your Bloom community.
          </p>
        </div>
        <p className="text-muted-foreground">
          Error: {reviewsData.error.message}
        </p>
      </div>
    );
  }

  const reviews = reviewsData.data?.reviews || [];
  const stats = reviewsData.data?.stats || {};

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Student Reviews</h1>
        <p className="text-muted-foreground">
          Manage and respond to feedback from your Bloom community.
        </p>
      </div>

      {/* High-level rating summary */}
      <ReviewStats stats={stats as TutorReview["stats"]} />

      {/* Interactive list with filtering */}
      <ReviewList reviews={reviews as TutorReview["reviews"]} />
    </div>
  );
}
