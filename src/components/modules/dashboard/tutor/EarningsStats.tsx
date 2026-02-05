"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, ArrowUpRight, TrendingUp } from "lucide-react";

export default function EarningsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-none shadow-sm bg-emerald-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium opacity-80">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 opacity-80" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$4,250.00</div>
          <p className="text-xs text-emerald-100 flex items-center mt-1">
            +12.5% from last month <ArrowUpRight className="h-3 w-3 ml-1" />
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pending Payout
          </CardTitle>
          <CreditCard className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$840.00</div>
          <p className="text-xs text-muted-foreground mt-1">
            Next payout: Feb 15th
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Average Session Fee
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45.00</div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on 94 sessions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
