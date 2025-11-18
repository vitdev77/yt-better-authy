import { RegisterForm } from "@/components/register-form";
import { ReturnButton } from "@/components/return-button";
import { SignInOauthButton } from "@/components/sign-in-oauth-button";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-sm space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/" label="Home" btnVariant="ghost" />

        <h1 className="text-2xl font-bold text-center">Create your account</h1>
      </div>

      <div className="flex flex-col w-full gap-3">
        <SignInOauthButton provider={"google"} signUp />
        <SignInOauthButton provider={"github"} signUp />
      </div>

      <FieldGroup className="mb-6">
        <FieldSeparator>or</FieldSeparator>
      </FieldGroup>

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
