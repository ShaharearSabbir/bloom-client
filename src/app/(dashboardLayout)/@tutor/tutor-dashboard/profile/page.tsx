import ProfileForm from "@/components/modules/dashboard/tutor/ProfileForm";
import ProfileHeader from "@/components/modules/dashboard/tutor/ProfileHeader";

export default function TutorProfilePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar and Quick Stats */}
        <div className="space-y-6">
          {/* You can add a separate AvatarUpload component here later */}
          <div className="bg-card rounded-xl p-6 border shadow-sm flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-4xl font-bold mb-4 border-2 border-emerald-500/20">
              T
            </div>
            <h3 className="font-bold text-xl">Tutor Name</h3>
            <p className="text-sm text-muted-foreground">
              Joined Bloom Jan 2026
            </p>
          </div>
        </div>

        {/* Right Side: The Interactive Form */}
        <div className="lg:col-span-2">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
