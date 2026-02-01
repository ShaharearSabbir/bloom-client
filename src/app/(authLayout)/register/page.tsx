import GoogleLogin from "@/components/modules/Auth/GoogleLogin";
import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create New Account</CardTitle>
        <CardDescription>Create a new account to get started.</CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/login">Sign In</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <GoogleLogin className="w-full" />
      </CardFooter>
    </Card>
  );
}
