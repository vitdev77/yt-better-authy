import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center p-6 gap-4">
      <Button asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/profile">Profile</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  );
}
