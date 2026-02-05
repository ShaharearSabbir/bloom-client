"use client";

import { Save, User, DollarSign, BookOpen, GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfileForm() {
  return (
    <Card className="border-none shadow-sm bg-card">
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
        <CardDescription>
          Update your teaching details to attract more students.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" /> Subject Category
            </label>
            <Select>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-dev">Web Development</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" /> Hourly Rate
              ($)
            </label>
            <Input type="number" placeholder="0.00" className="bg-background" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-500" /> Professional
            Title
          </label>
          <Input
            placeholder="e.g. Senior Fullstack Developer"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-500" /> About Me
          </label>
          <Textarea
            placeholder="Describe your teaching style and experience..."
            className="min-h-[150px] bg-background resize-none"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 px-8">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
