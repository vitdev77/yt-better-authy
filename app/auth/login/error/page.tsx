import { ReturnButton } from "@/components/return-button";

interface LoginErrorPageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function LoginErrorPage({
  searchParams,
}: LoginErrorPageProps) {
  const sp = await searchParams;

  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-sm space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

        <h1 className="text-2xl font-bold text-center">Login Error</h1>
      </div>

      <p className="text-destructive text-center">
        {sp.error === "account_not_linked"
          ? "This account is already linked to another sign-in method."
          : "Oops! Something went wrong. Please try again."}
      </p>
    </div>
  );
}
