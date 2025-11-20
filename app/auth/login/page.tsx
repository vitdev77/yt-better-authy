import { LoginForm } from "@/components/login-form";
import { ReturnButton } from "@/components/return-button";

export default async function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ReturnButton href="/" label="Home" btnVariant="ghost" />

        <LoginForm />
      </div>
    </div>
  );
}
