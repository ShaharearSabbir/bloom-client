// components/modules/marketing/HowItWorks.tsx
import { Search, CalendarDays, BookOpen, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Mentor",
    desc: "Browse our curated directory of verified experts across 8+ academic categories.",
    color: "bg-blue-500",
  },
  {
    icon: CalendarDays,
    title: "Book a Session",
    desc: "Pick a time that fits your schedule. Your first 15-minute consultation is on us.",
    color: "bg-emerald-500",
  },
  {
    icon: BookOpen,
    title: "Master the Subject",
    desc: "Engage in 1-on-1 personalized learning with real-time screen sharing and tools.",
    color: "bg-purple-500",
  },
  {
    icon: Star,
    title: "Track & Review",
    desc: "Share your feedback and track your progress as you reach your learning goals.",
    color: "bg-amber-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-bloom-works" className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-sm font-black uppercase tracking-widest text-emerald-600">
            The Bloom Process
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter">
            Four steps to <span className="text-zinc-400">your success</span>
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-[2rem] border-2 border-zinc-100 dark:border-zinc-800 hover:border-emerald-500/50 transition-all duration-300"
            >
              <div
                className={`mb-6 w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg`}
              >
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-black mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.desc}
              </p>

              {/* Subtle line connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[calc(100%-1rem)] w-[2rem] h-0.5 bg-zinc-100 dark:bg-zinc-800" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
