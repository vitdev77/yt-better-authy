import { ReturnButton } from "@/components/return-button";
import { CircleAlert } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;

  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-sm space-y-8 text-center">
      <ReturnButton href="/auth/login" label="Sign in" btnVariant="ghost" />

      <div className="space-y-4 flex flex-col items-center">
        <CircleAlert className="size-30 stroke-red-600" />

        <h1 className="text-2xl text-red-600 font-bold">Login Error</h1>

        <p className="text-muted-foreground">
          {sp.error === "account_not_linked"
            ? "This account is already linked to another sign-in method."
            : "Oops! Something went wrong. Please try again."}
        </p>
      </div>
    </div>
  );
}
