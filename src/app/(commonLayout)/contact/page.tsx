import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      {/* --- HEADER --- */}
      <div className="mb-16">
        <h1 className="text-5xl font-black tracking-tighter mb-4">
          Let's Connect.
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl">
          We’re here to help you get the most out of Bloom. Reach out to us
          directly via email, phone, or visit our headquarters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- CONTACT METHODS --- */}
        <div className="lg:col-span-1 space-y-4">
          <ContactCard
            icon={<Mail className="h-6 w-6" />}
            title="Email Support"
            value="support@bloom.com"
            link="mailto:support@bloom.com"
          />
          <ContactCard
            icon={<Phone className="h-6 w-6" />}
            title="Call Us"
            value="+880 123 456 789"
            link="tel:+880123456789"
          />
          <ContactCard
            icon={<Clock className="h-6 w-6" />}
            title="Working Hours"
            value="Sun - Thu, 9am - 6pm"
          />
        </div>

        {/* --- MOCK MAP SECTION --- */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-zinc-100 dark:border-zinc-800 rounded-[2rem] h-full shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-8">
              {/* This is a mock map interface */}
              <div className="text-center space-y-4">
                <MapPin className="h-12 w-12 text-emerald-500 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">Bloom Headquarters</h3>
                  <p className="text-muted-foreground">
                    Brahmanbaria, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Overlay footer for map */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm p-4 rounded-xl border flex items-center justify-between">
                <p className="text-sm font-semibold">Visit our office</p>
                <Link
                  href="#"
                  className="flex items-center gap-2 font-bold hover:text-emerald-600 transition-colors"
                >
                  Get Directions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}) {
  const CardContentInner = (
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );

  return (
    <Card className="border-2 border-zinc-100 dark:border-zinc-800 rounded-[2rem] hover:border-emerald-500/50 transition-colors">
      <CardContent className="p-6">
        {link ? (
          <Link href={link} className="block group">
            {CardContentInner}
          </Link>
        ) : (
          CardContentInner
        )}
      </CardContent>
    </Card>
  );
}
