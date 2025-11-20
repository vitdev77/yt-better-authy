import { ResetPasswordForm } from "@/components/reset-password-form";
import { ReturnButton } from "@/components/return-button";
import { redirect } from "next/navigation";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/login");

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
