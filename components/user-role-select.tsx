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
      value={role}
      onChange={handleChange}
      disabled={role === "ADMIN" || isPending}
      className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="ADMIN">ADMIN</option>
      <option value="USER">USER</option>
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
