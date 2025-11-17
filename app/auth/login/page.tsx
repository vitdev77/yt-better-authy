import { LoginForm } from "@/components/login-form";
import { ReturnButton } from "@/components/return-button";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-5xl space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/" label="Home" btnVariant="ghost" />

        <h1 className="text-3xl font-bold">Sign in to Better Authy</h1>
      </div>

      <LoginForm />

      <p className="text-muted-foreground text-sm">
        New to Better Authy?{" "}
        <Link href={"/auth/register"} className="text-primary underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
