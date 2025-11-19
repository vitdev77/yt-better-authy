import { LoginForm } from "@/components/login-form";
import { MagicLinkLoginForm } from "@/components/magic-link-login-form";
import { ReturnButton } from "@/components/return-button";
import { SignInOauthButton } from "@/components/sign-in-oauth-button";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-sm space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/" label="Home" btnVariant="ghost" />

        <h1 className="text-2xl font-bold text-center">
          Sign in to your account
        </h1>
      </div>

      <MagicLinkLoginForm />

      <FieldGroup className="mb-6">
        <FieldSeparator>or</FieldSeparator>
      </FieldGroup>

      <LoginForm />

      <p className="text-muted-foreground text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={"/auth/register"}
          className="text-primary underline-offset-4 underline"
        >
          Sign up
        </Link>
      </p>

      <FieldGroup className="mt-2">
        <FieldSeparator>or</FieldSeparator>
      </FieldGroup>

      <div className="flex flex-col w-full gap-3">
        <SignInOauthButton provider={"google"} />
        <SignInOauthButton provider={"github"} />
      </div>
    </div>
  );
}
