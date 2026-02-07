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

import { toast } from "sonner";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { createTutor, updateTutor } from "@/actions/tutor.Action";
import { Tutor } from "@/types/tutor";

const profileSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  hourlyRate: z.number().min(1, "Hourly rate is required"),
  profession: z.string().min(1, "Profession is required"),
  bio: z.string().min(1, "Bio is required"),
});

export default function ProfileForm() {
  const [isExist, setIsExist] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      categoryId: "",
      hourlyRate: 0,
      profession: "",
      bio: "",
    },
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      let res;

      isExist
        ? (res = await updateTutor(value))
        : (res = await createTutor(value));
    },
  });

  return (
    <Card className="border-none shadow-sm bg-card">
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
        <CardDescription>
          Update your teaching details to attract more students.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form>
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <form.Field
                  name="categoryId"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                        <Select onValueChange={(e) => form.handleSubmit(e)}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web-dev">
                              Web Development
                            </SelectItem>
                            <SelectItem value="data-science">
                              Data Science
                            </SelectItem>
                            <SelectItem value="math">Mathematics</SelectItem>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" /> Hourly
                  Rate ($)
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-500" />{" "}
                Professional Title
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
                <Save className="w-4 h-4" />{" "}
                {isExist ? "Save Changes" : "Create Tutor Profile"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
