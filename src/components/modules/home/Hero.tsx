import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container px-4 mx-auto text-center">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Master any subject with <br /> expert personal tutors.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
          Bloom connects you with certified educators for 1-on-1 sessions
          tailored to your learning style. Start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <Link href="/tutors">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto px-8"
            >
              Find a Tutor
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            How it Works
          </Button>
        </div>
      </div>
    </section>
  );
}
