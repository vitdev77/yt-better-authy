import { RegisterForm } from "@/components/register-form";
import { ReturnButton } from "@/components/return-button";

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ReturnButton href="/" label="Home" btnVariant="ghost" />

        <RegisterForm />
      </div>
    </div>
  );
}
