"use client";

import { use } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Save,
  User,
  DollarSign,
  GraduationCap,
  BookOpen,
  Loader2,
} from "lucide-react";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { createTutor, updateTutor } from "@/actions/tutor.Action";
import { Category } from "@/types/category";
import { toast } from "sonner";

const profileSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  hourlyRate: z.number().min(1, "Hourly rate is required"),
  profession: z.string().min(1, "Profession is required"),
  bio: z.string().min(1, "Bio is required"),
});

export default function ProfileForm({
  tutorPromise,
  categoryPromise,
}: {
  tutorPromise: Promise<any>;
  categoryPromise: Promise<any>;
}) {
  const result = use(tutorPromise);
  const existingData = result?.data?.data;
  const isExist = !!existingData;

  const categoryResult = use(categoryPromise);
  const categories: Category[] = categoryResult?.data.data;

  const form = useForm({
    defaultValues: {
      categoryId: existingData?.categoryId || "",
      hourlyRate: existingData?.hourlyRate || 0,
      profession: existingData?.profession || "",
      bio: existingData?.bio || "",
    },
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const res = isExist ? await updateTutor(value) : await createTutor(value);

      if (!res.data?.success) {
        toast.error(res.data.message);
      }

      toast.success(res.data.message);
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Field */}
              <form.Field
                name="categoryId"
                children={(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-500" /> Category
                    </FieldLabel>
                    <Select
                      defaultValue={existingData ? existingData.categoryId : ""}
                      value={field.state.value}
                      onValueChange={(val) => field.handleChange(val)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((c: Category) => (
                          <SelectItem key={c.categoryId} value={c.categoryId}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors.length > 0 && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              />

              {/* Hourly Rate Field */}
              <form.Field
                name="hourlyRate"
                children={(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-500" /> Hourly
                      Rate ($)
                    </FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="bg-background"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Profession Field */}
            <form.Field
              name="profession"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-500" />{" "}
                    Professional Title
                  </FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Senior Fullstack Developer"
                    className="bg-background"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            {/* Bio Field */}
            <form.Field
              name="bio"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-500" /> About Me
                  </FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Describe your teaching style..."
                    className="min-h-[150px] bg-background resize-none"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            <div className="flex justify-end pt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 px-8"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isExist ? "Save Changes" : "Create Tutor Profile"}
                  </Button>
                )}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
