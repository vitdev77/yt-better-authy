"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { changePasswordAction } from "@/actions/change-password.action";
import { toast } from "sonner";

export const ChangePasswordForm = () => {
  const [isPending, setIsPending] = React.useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.target as HTMLFormElement);

    const { error } = await changePasswordAction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Password changed successfully!");
      (evt.target as HTMLFormElement).reset();
    }

    setIsPending(false);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm w-full space-y-4"
      autoComplete="off"
    >
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          type="password"
          id="currentPassword"
          name="currentPassword"
          disabled={isPending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          disabled={isPending}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        Change Password
      </Button>
    </form>
  );
};
