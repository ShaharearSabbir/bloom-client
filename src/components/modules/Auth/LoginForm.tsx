"use client";

import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const registerSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await authClient.signIn.email({
        ...value,
        callbackURL: "http://localhost:3000",
      });

      if (res.error) {
        if (res.error.message === "Email not verified") {
          await authClient.sendVerificationEmail({
            email: value.email,
          });
          toast.error(
            "Please verify your email, a verification email has been sent",
          );
          return;
        }
        toast.error(res.error.message);
        return;
      }

      toast.success("Logged in");
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setError(null);
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="example@email.com"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="********"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <Button type="submit" className="w-full">
          Login
        </Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
