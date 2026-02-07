import ProfileForm from "@/components/modules/dashboard/tutor/ProfileForm";
import ProfileHeader from "@/components/modules/dashboard/tutor/ProfileHeader";
import userServices from "@/services/user.service";
import { getMyTutor } from "@/actions/tutor.Action"; // Import your action
import Image from "next/image";
import { Suspense } from "react";
import { getCategories } from "@/actions/category.action";

export default async function TutorProfilePage() {
  const session = await userServices.getSession();
  const user = session.data.user;

  // 1. Initiate the promise for the tutor data (don't await it here)
  const tutorPromise = getMyTutor();

  const categoryPromise = getCategories();

  const createdAt = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar and Quick Stats */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border shadow-sm flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-4xl font-bold mb-4 border-2 border-emerald-500/20 relative">
              {user.image ? (
                <Image
                  src={user.image}
                  fill // Use fill for profile containers
                  className="object-cover"
                  alt={`${user.name}'s avatar`}
                />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            <h3 className="font-bold text-xl">{user.name}</h3>
            <p className="text-sm text-muted-foreground">
              Joined Bloom {createdAt}
            </p>
          </div>
        </div>

        {/* Right Side: The Interactive Form */}
        <div className="lg:col-span-2">
          {/* 2. Wrap in Suspense and pass the promise */}
          <Suspense fallback={<ProfileFormSkeleton />}>
            <ProfileForm
              tutorPromise={tutorPromise}
              categoryPromise={categoryPromise}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Simple Skeleton for the loading state
function ProfileFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-[400px] bg-muted rounded-xl w-full" />
    </div>
  );
}
