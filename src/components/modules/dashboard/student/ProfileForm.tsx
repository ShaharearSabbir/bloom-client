"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Save, X, Mail, Hash, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Student } from "@/types/student.type";
import { updateProfile } from "@/actions/student.action";

export default function ProfileForm({
  initialStudent,
}: {
  initialStudent: Student;
}) {
  const student = initialStudent;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Student>(initialStudent);

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 rounded-2xl shadow-lg">
            <AvatarImage src={student.image || ""} />
            <AvatarFallback className="text-3xl font-bold bg-emerald-100 text-emerald-700">
              {student.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-black">{student.name}</h1>
            <p className="text-muted-foreground">Student Profile</p>
          </div>
        </div>

        <Button
          variant={isEditing ? "ghost" : "outline"}
          onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
          className="rounded-xl font-bold"
        >
          {isEditing ? (
            <>
              <X className="h-4 w-4 mr-2" /> Cancel
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" /> Edit
            </>
          )}
        </Button>
      </div>

      {/* Content Section */}
      {isEditing ? (
        <div className="space-y-6 animate-in fade-in duration-500 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                disabled
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <Button
            onClick={handleSave}
            className="w-full h-12 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700"
          >
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border">
              <div className="flex items-center gap-3 text-muted-foreground mb-1">
                <Mail className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Email
                </span>
              </div>
              <p className="font-semibold text-lg">{student.email}</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border">
              <div className="flex items-center gap-3 text-muted-foreground mb-1">
                <Hash className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Account type
                </span>
              </div>
              <p className="font-semibold text-lg">Premium</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground border-t pt-6">
            <Calendar className="h-4 w-4" />
            <span>Joined on {format(student.createdAt, "MMMM do, yyyy")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
