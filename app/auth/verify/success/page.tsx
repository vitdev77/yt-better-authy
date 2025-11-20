import { ReturnButton } from "@/components/return-button";
import { MailCheck } from "lucide-react";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-sm space-y-8 text-center">
      <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

      <div className="space-y-4 flex flex-col items-center">
        <MailCheck className="size-30 stroke-green-600" />

        <h1 className="text-2xl text-green-600 font-bold">Check your inbox</h1>

        <p className="text-muted-foreground">
          Success! You have re-sent a verification link to your email.
        </p>
      </div>
    </div>
  );
}
