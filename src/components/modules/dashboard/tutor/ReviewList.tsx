"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { TutorReview } from "@/types/review.type";

export default function ReviewList({
  reviews,
}: {
  reviews: TutorReview["reviews"];
}) {
  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
