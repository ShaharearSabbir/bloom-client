"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, Plus, CheckCircle2 } from "lucide-react";

export default function PayoutMethods() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Payout Method</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 text-emerald-600">
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl border bg-emerald-500/5 border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background rounded-lg shadow-sm">
              <Landmark className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                Bank Account •••• 4242
              </p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                Primary Method
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>

        <p className="text-[11px] text-muted-foreground px-1 italic text-center">
          Withdrawals are processed every Friday for the previous week's
          sessions.
        </p>
      </CardContent>
    </Card>
  );
}
