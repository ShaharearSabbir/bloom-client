import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  BookOpen,
  TrendingUp,
  ChevronRight,
  MessageSquare,
  Award,
} from "lucide-react";
import { auth } from "@/lib/auth-client";
import Link from "next/link";
import { getStudentStats } from "@/actions/student.action";

// Mock Data
const upcomingSessions = [
  {
    id: 1,
    subject: "Advanced Next.js Architecture",
    tutor: "Dr. Sarah Jenkins",
    time: "Today, 2:00 PM",
    status: "Upcoming",
  },
  {
    id: 2,
    subject: "Prisma Database Optimization",
    tutor: "Tech Mentor Mark",
    time: "Tomorrow, 10:00 AM",
    status: "Upcoming",
  },
];

export default async function StudentDashboardPage() {
  const sessionData = await auth.getSession();

  const calculateSkillLevel = (bookingCount: number): string => {
    if (bookingCount >= 20) return "Advanced";
    if (bookingCount >= 10) return "Intermediate";
    return "Beginner";
  };

  const user = sessionData.data?.user;

  const statsData = await getStudentStats();

  if (statsData.error) {
    console.error("Error fetching student stats:", statsData.error);
  }

  const stats = statsData.data;

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">
            Welcome back, {user?.name || "user"}
          </h1>
          <p className="text-muted-foreground mt-1">
            You have {stats?.upcomingBooking.length || 0} sessions scheduled for
            this week.
          </p>
        </div>
        <Link href={"/tutors"}>
          <Button className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 h-12 px-6">
            <Calendar className="mr-2 h-4 w-4" /> Book New Session
          </Button>
        </Link>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Lessons"
          value={stats ? stats.bookingCount.toString() : "0"}
          icon={<BookOpen className="h-5 w-5 text-blue-500" />}
        />
        <StatCard
          title="Hours Learned"
          value={stats ? (stats.bookingCount * 1).toString() : "0"}
          icon={<Clock className="h-5 w-5 text-emerald-500" />}
        />
        <StatCard
          title="Skill Level"
          value={stats ? calculateSkillLevel(stats.bookingCount) : "Beginner"}
          icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-2 border-zinc-100 dark:border-zinc-800 rounded-[2rem] shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-black">
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats?.upcomingBooking?.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-white dark:bg-zinc-800 border flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {session.categoryName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      with {session.tutorName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{session.startTime}</p>
                  <Badge variant="secondary" className="mt-1 rounded-full">
                    {"Confirmed"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-2 border-zinc-100 dark:border-zinc-800 rounded-[2rem] shadow-none">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-black mt-1">{value}</p>
        </div>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">{icon}</div>
      </CardContent>
    </Card>
  );
}
