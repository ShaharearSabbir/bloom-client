import { Users, CalendarCheck, Clock, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAdminStats } from "@/actions/admin.action";

export default async function AdminDashboardOverview() {
  const statsData = await getAdminStats();

  if (statsData.error) {
    console.error("Error fetching admin stats:", statsData.error);
  }

  const stats = statsData.data;

  console.log(stats);

  return (
    <div className="space-y-8 p-6 md:p-10">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! Here is an overview of your platform's performance.
        </p>
      </div>

      {/* Grid for Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {stats ? stats.totalStudents : "0"}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tutor
            </CardTitle>
            <Users className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {stats ? stats.totalTutors : "0"}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {stats ? stats.totalBookings : "0"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links Section */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Quick Management Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/admin-dashboard/users" className="flex items-center gap-2">
              Manage Users <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/admin-dashboard/bookings" className="flex items-center gap-2">
              Manage Bookings <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
