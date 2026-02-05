"use client";

import { Star, Reply } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReviewCard({ review }: { review: any }) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-card/50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-700 font-bold">
              {review.studentName[0]}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold">{review.studentName}</h4>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                  • {review.date}
                </span>
              </div>
              <div className="flex items-center gap-0.5 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "opacity-20 text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed italic">
                "{review.comment}"
              </p>
              <p className="text-[10px] text-emerald-600 font-medium mt-1">
                Topic: {review.subject}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
              <Reply className="w-3 h-3" /> Reply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
