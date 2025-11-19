import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { ReturnButton } from "@/components/return-button";

export default async function ForgotPasswordPage() {
  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-sm space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

        <h1 className="text-2xl font-bold text-center">
          Forgot your password?
        </h1>
        <p className="text-muted-foreground text-center">
          Enter your user account&apos;s verified email address and we will send
          you a link to reset your password.
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
