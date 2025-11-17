import { ReturnButton } from "@/components/return-button";
import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-5xl space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/" label="Home" btnVariant="ghost" />

        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      <SignOutButton />

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
