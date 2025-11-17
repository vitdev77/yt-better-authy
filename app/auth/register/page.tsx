import { RegisterForm } from "@/components/register-form";
import { ReturnButton } from "@/components/return-button";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-5xl space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/" label="Home" btnVariant="ghost" />

        <h1 className="text-3xl font-bold">Sign up for Better Authy</h1>
      </div>

      <RegisterForm />

      <p className="text-muted-foreground text-sm">
        Already have an account?{" "}
        <Link href={"/auth/login"} className="text-primary underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
