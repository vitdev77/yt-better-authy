import { ReturnButton } from "@/components/return-button";
import { SendVerificationEmailForm } from "@/components/send-verification-email-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  if (!error) redirect("/profile");

  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-sm space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

        <h1 className="text-2xl font-bold text-center">Verify Email</h1>
      </div>

      <p className="text-destructive text-center">
        {error === "invalid_token" || error === "token_expired"
          ? "Your token is invalid or expired. Please request a new one."
          : error === "email_not_verified"
          ? "Please verify your email, or request a new verification below"
          : "Oops! Something went wrong. Please try again."}
      </p>

      <SendVerificationEmailForm />
    </div>
  );
}
