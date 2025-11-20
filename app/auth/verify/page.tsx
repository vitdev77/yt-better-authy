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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

        <div className="text-sm text-center text-destructive">
          <p className="font-bold">
            {error === "invalid_token" || error === "token_expired"
              ? "Your token is invalid or expired."
              : error === "email_not_verified"
              ? "Please verify your email,"
              : "Oops! Something went wrong."}
          </p>
          <p>
            {" "}
            {error === "invalid_token" || error === "token_expired"
              ? "Please request a new one."
              : error === "email_not_verified"
              ? "or request a new verification below"
              : "Please try again."}
          </p>
        </div>

        <SendVerificationEmailForm />
      </div>
    </div>
  );
}
