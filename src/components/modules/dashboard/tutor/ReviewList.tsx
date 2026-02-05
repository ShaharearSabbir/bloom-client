"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ReviewCard from "./ReviewCard";

const mockReviews = [
  {
    id: "REV-1",
    studentName: "Alex Johnson",
    rating: 5,
    comment:
      "Incredible session! The explanation of Prisma relations was very clear.",
    date: "Feb 2, 2026",
    subject: "Backend Development",
  },
  {
    id: "REV-2",
    studentName: "Sarah Miller",
    rating: 4,
    comment: "Very helpful, but we ran out of time for the advanced topics.",
    date: "Jan 28, 2026",
    subject: "React Fundamentals",
  },
];

export default function ReviewList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = mockReviews.filter(
    (review) =>
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.studentName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          className="pl-10 bg-card border-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
