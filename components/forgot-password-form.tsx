"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { forgetPassword } from "@/lib/auth-client";

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email.");

    await forgetPassword({
      email,
      redirectTo: "/auth/reset-password",
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
          toast.success("Reset link sent to your email!");
          router.push("/auth/forgot-password/success");
        },
      },
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your user account&apos;s verified email address and we will
            send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4"
            autoComplete="off"
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  disabled={isPending}
                  // autoComplete="off"
                  autoFocus
                  // required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Sending..." : "Send password reset email"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
