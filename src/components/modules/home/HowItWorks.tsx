import { UserPlus, Calendar, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Choose a Tutor",
      desc: "Browse through our verified experts.",
    },
    {
      icon: Calendar,
      title: "Book a Session",
      desc: "Pick a time that fits your schedule.",
    },
    {
      icon: Rocket,
      title: "Start Learning",
      desc: "Join your interactive 1-on-1 virtual classroom.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple. Fast. Effective.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {steps.map((step, i) => (
            <div key={i} className="space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
