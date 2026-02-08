// src/components/modules/tutors/TutorCard.tsx
"use client";

import Link from "next/link";
import { Star, ShieldCheck, Clock, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TutorCardProps {
  tutor: {
    id: string;
    name: string;
    bio: string;
    avatarUrl?: string;
    category: string;
    hourlyRate: number;
    rating: number;
    totalReviews: number;
    isVerified?: boolean;
  };
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all hover:shadow-md group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar & Verification */}
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
              <AvatarImage src={tutor.avatarUrl} alt={tutor.name} />
              <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold text-xl">
                {tutor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {tutor.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-900 rounded-full p-0.5">
                <ShieldCheck className="h-5 w-5 text-emerald-500 fill-emerald-50" />
              </div>
            )}
          </div>

          {/* Header Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg leading-tight truncate group-hover:text-emerald-600 transition-colors">
                  {tutor.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold">{tutor.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({tutor.totalReviews} reviews)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">
                  ${tutor.hourlyRate}
                </p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  per hour
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Snippet */}
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {tutor.bio}
        </p>

        {/* Subjects Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge
            key={tutor.category}
            variant="secondary"
            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 font-medium border-none"
          >
            <BookOpen className="w-3 h-3 mr-1" />
            {tutor.category}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 bg-zinc-50/50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800 flex gap-3">
        <Button asChild variant="outline" className="flex-1 rounded-xl">
          <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
        </Button>
        <Button
          asChild
          className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Link href={`/tutors/${tutor.id}/book`}>Book Lesson</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
