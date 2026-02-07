"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth-client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function GoogleLogin({ className }: { className?: string }) {
  // 1. Move state to the top level
  const [selectedRole, setSelectedRole] = useState("STUDENT");

  const handleGoogleLogin = async () => {
    await auth.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
      additionalData: {
        role: selectedRole,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-center items-center">
        <div className="border-b-2 w-full"></div>
        <div className="mx-4">OR</div>
        <div className="border-b-2 w-full"></div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">I'm a...</p>

        {/* 2. Added Radio Group with Student auto-selected */}
        <RadioGroup
          defaultValue="STUDENT"
          onValueChange={(value) => setSelectedRole(value)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="STUDENT" id="student" />
            <Label htmlFor="student">Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="TUTOR" id="tutor" />
            <Label htmlFor="tutor">Tutor</Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        onClick={handleGoogleLogin}
        className={className}
        variant="outline"
        type="button"
      >
        Continue with Google
      </Button>
    </div>
  );
}
