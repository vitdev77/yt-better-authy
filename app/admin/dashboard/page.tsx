import {
  DeleteUserButton,
  PlaceholderDeleteUserButton,
} from "@/components/delete-user-button";
import {
  EditUserButton,
  PlaceholderEditUserButton,
} from "@/components/edit-user-button";
import { ReturnButton } from "@/components/return-button";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRoleSelect } from "@/components/user-role-select";
import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { ShieldCheck, ShieldQuestionMark, Verified } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "ADMIN") {
    return (
      <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-5xl space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <ReturnButton href="/profile" label="Profile" btnVariant="ghost" />

          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <p className="py-2 px-6 rounded-md text-lg bg-destructive text-white font-bold">
            FORBIDDEN
          </p>
        </div>
      </div>
    );
  }

  const { users } = await auth.api.listUsers({
    headers: headersList,
    query: {
      sortBy: "name",
    },
  });

  const sortedUsers = users.sort((a, b) => {
    if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
    if (a.role !== "ADMIN" && b.role === "ADMIN") return 1;
    return 0;
  });

  return (
    <div className="px-8 py-16 container mx-auto flex flex-col min-h-screen items-center justify-center max-w-5xl space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <ReturnButton href="/profile" label="Profile" btnVariant="ghost" />

        <h1 className="text-3xl font-bold mt-4">Admin Dashboard</h1>

        <p className="py-2 px-6 rounded-md text-lg bg-green-600 text-white font-bold">
          ACCESS GRANTED
        </p>
      </div>

      <div className="overflow-hidden rounded-md border w-full">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium font-mono">
                  {user.id.slice(0, 8)}
                  <span className="text-xs text-muted-foreground">
                    ...{user.id.slice(-3)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {user.emailVerified === true ? (
                      <ShieldCheck className="stroke-green-600 size-4" />
                    ) : (
                      <ShieldQuestionMark className="stroke-amber-400 size-4" />
                    )}{" "}
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <UserRoleSelect
                    userId={user.id}
                    role={user.role as UserRole}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {user.id === session.user.id ? (
                      <PlaceholderEditUserButton />
                    ) : (
                      <EditUserButton userId={user.id} />
                    )}

                    {user.role === "USER" ? (
                      <DeleteUserButton userId={user.id} />
                    ) : (
                      <PlaceholderDeleteUserButton />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
