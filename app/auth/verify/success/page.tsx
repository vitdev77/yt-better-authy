import { ReturnButton } from "@/components/return-button";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-sm space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

        <h1 className="text-2xl font-bold text-center">Success</h1>
      </div>

      <p className="text-muted-foreground text-center">
        Success! You have re-sent a verification link to your email.
      </p>
    </div>
  );
}
