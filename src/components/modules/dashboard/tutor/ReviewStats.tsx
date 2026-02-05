"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, MessageSquare } from "lucide-react";

export default function ReviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-full">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Average Rating
            </p>
            <h3 className="text-2xl font-bold">4.9 / 5.0</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-full">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Total Reviews
            </p>
            <h3 className="text-2xl font-bold">128</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Happy Students
            </p>
            <h3 className="text-2xl font-bold">98%</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
