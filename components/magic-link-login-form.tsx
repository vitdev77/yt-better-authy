"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { WandSparkles } from "lucide-react";

export const MagicLinkLoginForm = () => {
  const [isPending, setIsPending] = React.useState(false);
  const ref = React.useRef<HTMLDetailsElement>(null);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const emailMagicLink = String(formData.get("emailMagicLink"));

    if (!emailMagicLink) return toast.error("Please enter your email.");

    await signIn.magicLink({
      email: emailMagicLink,
      name: emailMagicLink.split("@")[0],
      callbackURL: "/profile",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Check your email for the magic link!");
          if (ref.current) ref.current.open = false;
          (evt.target as HTMLFormElement).reset();
        },
      },
    });
  }

  return (
    <details
      ref={ref}
      className="max-w-sm rounded-md border-2 border-b-0 border-purple-600 overflow-hidden w-full"
    >
      <summary className="flex items-center justify-center gap-2 px-2 py-1.75 bg-purple-600 text-white hover:bg-purple-600/80 transition text-sm font-medium cursor-pointer">
        <WandSparkles size={16} /> Sign in with Magic Link
      </summary>

      <form onSubmit={handleSubmit} className="p-2">
        <Label htmlFor="emailMagicLink" className="sr-only">
          Email
        </Label>

        <div className="flex items-center gap-2">
          <Input
            type="email"
            id="emailMagicLink"
            name="emailMagicLink"
            placeholder="Enter your email"
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending}>
            Send
          </Button>
        </div>
      </form>
    </details>
  );
};
