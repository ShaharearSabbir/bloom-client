import Categories from "@/components/modules/home/Categories";
import CTA from "@/components/modules/home/CTA";
import FeaturedTutors from "@/components/modules/home/FeaturedTutors";
import Hero from "@/components/modules/home/Hero";
import HowItWorks from "@/components/modules/home/HowItWorks";

export default function Home() {
  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Hero />
      <Categories />
      <HowItWorks />
      <FeaturedTutors />
      <CTA />
    </div>
  );
}
