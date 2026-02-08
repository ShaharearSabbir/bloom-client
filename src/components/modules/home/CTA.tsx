import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="bg-emerald-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to grow your knowledge?
            </h2>
            <p className="text-emerald-50 text-lg">
              Join thousands of students achieving their goals on Bloom.
            </p>
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-zinc-100 px-10 h-14 rounded-full font-bold text-lg"
            >
              Get Started for Free
            </Button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full -mr-20 -mt-20 opacity-50" />
        </div>
      </div>
    </section>
  );
}
