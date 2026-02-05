import React from "react";
import {
  Users,
  Star,
  Wallet,
  CalendarCheck,
  ArrowUpRight,
  Clock,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Stat definition for the grid
const stats = [
  {
    label: "Total Students",
    value: "24",
    icon: Users,
    color: "text-emerald-500",
  },
  { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-emerald-500" },
  {
    label: "Total Earnings",
    value: "$1,240",
    icon: Wallet,
    color: "text-emerald-500",
  },
  {
    label: "Sessions",
    value: "86",
    icon: CalendarCheck,
    color: "text-emerald-500",
  },
];

export default function TutorDashboard() {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tutor Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your teaching schedule and track your Bloom earnings.
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
          <Plus className="w-4 h-4" /> New Availability
        </Button>
      </div>

      {/* Stats Grid using Shadcn Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions List */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription>
                You have 2 sessions scheduled for today.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg border bg-accent/50 hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                    {i === 1 ? "A" : "S"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none mb-1">
                      {i === 1 ? "Alex Johnson" : "Sarah Williams"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Next.js Development
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1">
                    {i === 1 ? "14:00" : "16:30"}
                  </Badge>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Today
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action / Quick Info Card */}
        <div className="space-y-6">
          <Card className="bg-emerald-600 dark:bg-emerald-900 border-none text-white shadow-lg overflow-hidden relative">
            <CardHeader>
              <CardTitle>Profile Status</CardTitle>
              <CardDescription className="text-emerald-100/80">
                Your profile is currently active and visible to students.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="bg-white/10 p-3 rounded-md border border-white/20">
                <p className="text-xs font-medium uppercase opacity-70 mb-1 text-white">
                  Next Lesson
                </p>
                <p className="text-lg font-bold text-white">In 45 minutes</p>
              </div>
              <Button className="w-full bg-white text-emerald-700 hover:bg-emerald-50 font-bold">
                Edit Tutor Bio
              </Button>
            </CardContent>
            {/* Subtle decorative circle */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-sm italic text-muted-foreground">
              "Great session, very helpful with my Prisma issues!"
              <div className="mt-2 flex items-center gap-1 text-emerald-500">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
