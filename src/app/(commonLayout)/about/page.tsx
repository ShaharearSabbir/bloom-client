import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, BookOpen, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* --- MISSION HERO --- */}
        <div className="text-center space-y-6 mb-24">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none rounded-full px-4 py-1">
            <Sparkles className="w-4 h-4 mr-2" /> Our Mission
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Where Knowledge <br className="hidden md:block" />
            <span className="text-emerald-600">Meets Achievement.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bloom was founded on the belief that personalized mentorship is the
            single most powerful catalyst for growth. We are building the
            platform where curious minds connect with masters of their craft.
          </p>
        </div>

        {/* --- VALUES GRID --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <ValueCard
            icon={<Target className="w-8 h-8 text-emerald-500" />}
            title="Goal-Oriented Learning"
            description="We don't just teach; we track progress. Every booking on Bloom is designed to move you closer to a concrete skill milestone."
          />
          <ValueCard
            icon={<Users className="w-8 h-8 text-blue-500" />}
            title="Community First"
            description="Our ecosystem thrives on collaboration. Whether you are a student or a tutor, you are part of a community dedicated to lifelong curiosity."
          />
          <ValueCard
            icon={<ShieldCheck className="w-8 h-8 text-purple-500" />}
            title="Verified Expertise"
            description="Quality is non-negotiable. Every tutor on our platform is vetted to ensure you receive the highest standard of guidance."
          />
          <ValueCard
            icon={<BookOpen className="w-8 h-8 text-amber-500" />}
            title="Accessible Knowledge"
            description="We are breaking down geographical barriers, making world-class education available to anyone with an internet connection."
          />
        </div>

        {/* --- STATS SECTION --- */}
        <div className="border-t border-b py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Tutors", value: "500+" },
            { label: "Students", value: "10k+" },
            { label: "Sessions", value: "25k+" },
            { label: "Completion Rate", value: "98%" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-black tracking-tighter mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-2 border-zinc-100 dark:border-zinc-800 rounded-[2rem] shadow-none hover:border-emerald-500/50 transition-colors">
      <CardContent className="p-8 space-y-4">
        <div className="bg-zinc-100 dark:bg-zinc-900 w-16 h-16 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-2xl font-black">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
