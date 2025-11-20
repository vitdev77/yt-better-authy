"use client";

import * as React from "react";
import Link from "next/link";
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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { SignInOauthButton } from "@/components/sign-in-oauth-button";
import { signUpEmailAction } from "@/actions/sign-up-email.action";

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.target as HTMLFormElement);

    const { error } = await signUpEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Registration complete. Please verify your email.");
      router.push("/auth/register/success");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
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
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  disabled={isPending}
                  autoComplete="off"
                  autoFocus
                  // required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  disabled={isPending}
                  autoComplete="off"
                  // required
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  disabled={isPending}
                  autoComplete="new-password"
                  // required
                />
                <FieldDescription>
                  Must be at least 6 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Signing up..." : "Sign up"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                or
              </FieldSeparator>
              <Field>
                <div className="flex flex-col w-full gap-3">
                  <SignInOauthButton provider={"google"} signUp />
                  <SignInOauthButton provider={"github"} signUp />
                </div>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href="/auth/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
};
