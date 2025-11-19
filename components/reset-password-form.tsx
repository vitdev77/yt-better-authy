"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/auth-client";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const newPassword = String(formData.get("newPassword"));
    const confirmNewPassword = String(formData.get("confirmNewPassword"));

    if (!newPassword) return toast.error("Please enter your new password.");
    if (newPassword !== confirmNewPassword)
      return toast.error("Password do not match.");

    await resetPassword({
      newPassword,
      token,
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
          toast.success("Password reset successfully.");
          router.push("/auth/login");
        },
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4"
      autoComplete="off"
    >
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          disabled={isPending}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
        <Input
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          disabled={isPending}
          autoComplete="off"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Please wait..." : "Reset password"}
      </Button>
    </form>
  );
};
