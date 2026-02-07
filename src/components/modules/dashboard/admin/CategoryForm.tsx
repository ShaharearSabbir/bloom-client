"use client";

import { useForm } from "@tanstack/react-form"; // Ensure this is installed
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save, Loader2, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Field, FieldError } from "@/components/ui/field";
import { createCategory } from "@/actions/category.action";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),
});

export default function CategoryForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },

    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await createCategory(value);

        if (!res.data?.success) {
          toast.error(res.data.message);
        }

        toast.success(res.data.message);

        form.reset();
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  const handleNameChange = (name: string, field: any) => {
    field.handleChange(name);
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

    form.setFieldValue("slug", generatedSlug);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="pt-6 space-y-6">
          <form.Field
            name="name"
            children={(field) => {
              const showError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <Field className="space-y-2">
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Category Name
                  </Label>
                  <Input
                    id={field.name}
                    placeholder="e.g., Artificial Intelligence"
                    className="bg-background"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => handleNameChange(e.target.value, field)}
                  />
                  {showError && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="slug"
            children={(field) => {
              const showError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <Field className="space-y-2">
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    URL Slug
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm border-r pr-3">
                      bloom.com/
                    </div>
                    <Input
                      id={field.name}
                      className="pl-[105px] bg-background font-mono text-sm"
                      placeholder="ai-tutors"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  {showError && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <Alert className="bg-emerald-500/5 border-emerald-500/10 py-3">
            <Info className="h-4 w-4 text-emerald-600" />
            <AlertDescription className="text-xs text-emerald-700/80">
              The slug is used in the URL for the category landing page.
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-end">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 px-8 transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Category
              </Button>
            )}
          />
        </CardFooter>
      </Card>
    </form>
  );
}
