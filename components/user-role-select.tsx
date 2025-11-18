"use client";

import * as React from "react";
import { UserRole } from "@prisma/client";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { admin } from "@/lib/auth-client";
import { toast } from "sonner";

interface UserRoleSelectProps {
  userId: string;
  role: UserRole;
}

export const UserRoleSelect = ({ userId, role }: UserRoleSelectProps) => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  async function handleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = evt.target.value as UserRole;

    const canChangeRole = await admin.hasPermission({
      permissions: {
        user: ["set-role"],
      },
    });

    if (canChangeRole.error) {
      return toast.error("Forbidden");
    }

    await admin.setRole({
      userId,
      role: newRole,
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
          toast.success("User role updated");
          router.refresh();
        },
      },
    });
  }

  return (
    <select
      id={userId}
      value={role}
      onChange={handleChange}
      disabled={role === "ADMIN" || isPending}
      className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-8 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 disabled:bg-muted md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    >
      <option value="ADMIN">admin</option>
      <option value="USER">user</option>
    </select>
    // TODO: Need to convert to shadcn select component
    // <Select
    //   value={role}
    //   onValueChange={handleChange}
    //   disabled={role === "ADMIN" || isPending}
    // >
    //   <SelectTrigger>
    //     <SelectValue placeholder="Role" />
    //   </SelectTrigger>
    //   <SelectContent>
    //     <SelectItem value="ADMIN">ADMIN</SelectItem>
    //     <SelectItem value="USER">USER</SelectItem>
    //   </SelectContent>
    // </Select>
  );
};
