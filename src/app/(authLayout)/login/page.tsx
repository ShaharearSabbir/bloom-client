import LoginForm from "@/components/modules/Auth/LoginForm";
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

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Login to resume blooming</CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/register">Register</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Continue with google
        </Button>
      </CardFooter>
    </Card>
  );
}
