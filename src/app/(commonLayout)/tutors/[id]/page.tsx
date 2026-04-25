import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageSquare,
  Globe,
  Award,
} from "lucide-react";
import Link from "next/link";
import { getTutorDetails } from "@/actions/tutor.Action";
import BookingDialog from "@/components/modules/tutors/BookingDialog";
import ReviewList from "@/components/modules/tutors/ReviewList";
import AddReviewForm from "@/components/modules/tutors/AddReviewForm";
import { Review } from "@/types/review.type";

export default async function TutorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Parallel fetching for performance
  const tutorData = await getTutorDetails(id);

  const tutor = tutorData.data;

  const reviews = tutor?.reviews;

  if (!tutor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Tutor profile not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* --- HERO SECTION --- */}
      <div className="relative border-b bg-zinc-50/50 dark:bg-zinc-900/20 pt-10 pb-16">
        <div className="container mx-auto px-4">
          <nav className="flex mb-8 text-xs uppercase tracking-widest text-muted-foreground">
            <Link
              href="/tutors"
              className="hover:text-emerald-600 transition-colors"
            >
              Directory
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{tutor.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-10 items-end lg:items-center">
            <Avatar className="h-32 w-32 lg:h-48 lg:w-48 rounded-2xl shadow-2xl ring-4 ring-white dark:ring-zinc-900">
              <AvatarImage
                src={tutor.avatarUrl}
                alt={tutor.name}
                className="object-cover"
              />
              <AvatarFallback className="text-4xl">
                {tutor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tighter">
                    {tutor.name}
                  </h1>
                  {tutor.isVerified && (
                    <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-none rounded-full p-1">
                      <CheckCircle2 className="h-5 w-5" />
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl italic">
                  &quot;Mastering {tutor.category} through personalized,
                  goal-oriented mentorship.&quot;
                </p>
              </div>

              <div className="flex flex-wrap gap-6 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                  <span>
                    {tutor.rating}{" "}
                    <span className="text-muted-foreground font-normal">
                      ({tutor.totalReviews} reviews)
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span>Bengali, English</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  <span>Verified Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Bio, Features, Reviews */}
          <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-1">
                  Price
                </p>
                <p className="text-xl font-bold">${tutor.hourlyRate}/hr</p>
              </div>
              <div className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-1">
                  Subject
                </p>
                <p className="text-xl font-bold truncate">{tutor.category}</p>
              </div>
              <div className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-1">
                  Experience
                </p>
                <p className="text-xl font-bold">5+ Years</p>
              </div>
              <div className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-1">
                  Response
                </p>
                <p className="text-xl font-bold">~1hr</p>
              </div>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <div className="h-8 w-1 bg-emerald-500 rounded-full" /> The
                Mentorship Approach
              </h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                  {tutor.bio}
                </p>
              </div>
            </section>

            {/* REVIEW SECTIONS */}
            <div className="border-t pt-12 space-y-12">
              <ReviewList reviews={reviews as Review[]} />
              <AddReviewForm tutorId={tutor.id} />
            </div>
          </div>

          {/* Right Side: Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <Card className="border-2 border-zinc-100 dark:border-zinc-800 shadow-2xl rounded-[2rem] overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-1">
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      Rate
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-4xl font-black">
                        ${tutor.hourlyRate}
                      </span>
                      <span className="text-muted-foreground font-medium">
                        per hour
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <BookingDialog tutor={tutor} />
                    <Button
                      variant="outline"
                      className="w-full h-14 rounded-2xl text-lg font-bold border-2"
                    >
                      Send Message
                    </Button>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                      <span>Bloom Payment Protection</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Star className="h-5 w-5 text-amber-500" />
                      <span>Top Rated Educator</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE FLOATING ACTION BAR --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 border-t bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">
              Hourly Rate
            </p>
            <p className="text-xl font-black">${tutor.hourlyRate}</p>
          </div>
          <Button className="flex-1 h-12 rounded-xl font-bold bg-emerald-600 text-white">
            Reserve Now
          </Button>
        </div>
      </div>
    </div>
  );
}
