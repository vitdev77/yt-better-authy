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
    // <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-sm space-y-6">
    //   <div className="flex flex-col items-center space-y-4">
    //     <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

    //     <h1 className="text-2xl font-bold text-center">Change your password</h1>
    //     <p className="text-muted-foreground text-center">
    //       Please enter your new password. Make sure it is at least 6 characters.
    //     </p>
    //   </div>

    //   <ResetPasswordForm token={token} />
    // </div>

    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
